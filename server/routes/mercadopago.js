import { Router } from "express";
import crypto from "node:crypto";
import { MercadoPagoConfig, PreApproval } from "mercadopago";
import { PLANS } from "../plans.js";

const router = Router();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preApproval = new PreApproval(client);

const baseUrl = () =>
  process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 5173}`;

// In-memory idempotency cache for /subscription/create. Survives single-process
// restarts only; for multi-instance deploys swap for Redis/SQLite.
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000;
const idempotencyCache = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of idempotencyCache) {
    if (now - v.ts > IDEMPOTENCY_TTL_MS) idempotencyCache.delete(k);
  }
}, 60_000).unref();

// POST /api/subscription/create
// body: { planId, payer: { email, name } }
// returns: { id, init_point }
router.post("/subscription/create", async (req, res) => {
  try {
    const { planId, payer } = req.body || {};
    const plan = PLANS[planId];
    if (!plan) return res.status(400).json({ error: "Plan inválido" });
    if (!payer?.email) return res.status(400).json({ error: "Falta email del pagador" });

    // MP rejects PreApproval back_url/notification_url unless they're HTTPS in production.
    // In dev/test we allow http:// so sandbox flows can be tested locally.
    const isProd = process.env.NODE_ENV === "production";
    if (isProd && !/^https:\/\//i.test(baseUrl())) {
      console.error(`[mercadopago] PUBLIC_BASE_URL must be HTTPS, got: ${baseUrl()}`);
      return res.status(500).json({
        error: "Configuración inválida: PUBLIC_BASE_URL debe ser HTTPS para que Mercado Pago acepte back_url y notification_url.",
      });
    }
    if (!isProd && !/^https:\/\//i.test(baseUrl())) {
      console.warn(`[mercadopago] dev/test mode: using non-HTTPS back_url (${baseUrl()}). MP sandbox may reject notification_url — webhook delivery will not work locally.`);
    }

    // Idempotency: dedupe rapid double-submits (double-click, refresh) per
    // (planId, email) for 5 minutes. Returns the previously-created init_point
    // instead of charging the user twice.
    const dedupeKey = `${plan.id}:${payer.email.toLowerCase()}`;
    const cached = idempotencyCache.get(dedupeKey);
    if (cached && Date.now() - cached.ts < IDEMPOTENCY_TTL_MS) {
      return res.json(cached.payload);
    }

    // MP requires back_url to be a publicly reachable URL (no localhost).
    // In dev/test, set MP_BACK_URL in .env to point at your production domain or ngrok tunnel.
    const backBase = process.env.MP_BACK_URL || baseUrl();
    const notifUrl = `${baseUrl()}/api/webhooks/mercadopago`;
    const useNotif = /^https:\/\//i.test(notifUrl);

    const result = await preApproval.create({
      body: {
        reason: `PixquiCloud — ${plan.title}`,
        external_reference: `${plan.id}-${crypto.randomUUID()}`,
        payer_email: payer.email,
        back_url: `${backBase}/success`,
        ...(useNotif && { notification_url: notifUrl }),
        auto_recurring: {
          frequency: plan.frequency,
          frequency_type: plan.frequency_type,
          transaction_amount: plan.transaction_amount,
          currency_id: plan.currency_id,
        },
        status: "pending",
      },
    });

    const payload = {
      id: result.id,
      init_point: result.init_point,
      status: result.status,
    };
    idempotencyCache.set(dedupeKey, { ts: Date.now(), payload });

    return res.json(payload);
  } catch (err) {
    console.error("[mercadopago] subscription/create error:", err);
    const dev = process.env.NODE_ENV !== "production";
    return res.status(500).json({
      error: "No se pudo crear la suscripción",
      ...(dev && { debug: { message: err?.message, status: err?.status, code: err?.code } }),
    });
  }
});

// GET /api/subscription/list?email=X
// Lists active subscriptions for a given payer email.
router.get("/subscription/list", async (req, res) => {
  try {
    const { email } = req.query || {};
    if (!email) return res.status(400).json({ error: "Falta email" });

    const result = await preApproval.search({
      options: { payer_email: email, status: "authorized" },
    });

    const items = (result.results || []).map((s) => ({
      id: s.id,
      reason: s.reason,
      status: s.status,
      amount: s.auto_recurring?.transaction_amount,
      currency: s.auto_recurring?.currency_id,
      frequency: s.auto_recurring?.frequency,
      frequency_type: s.auto_recurring?.frequency_type,
      next_payment_date: s.next_payment_date,
      date_created: s.date_created,
    }));

    return res.json({ items });
  } catch (err) {
    console.error("[mercadopago] subscription/list error:", err);
    return res.status(500).json({ error: "No se pudieron listar las suscripciones" });
  }
});

// POST /api/subscription/cancel
// body: { id, email } — email used to verify ownership (basic check).
router.post("/subscription/cancel", async (req, res) => {
  try {
    const { id, email } = req.body || {};
    if (!id || !email) return res.status(400).json({ error: "Faltan datos" });

    // Verify the subscription belongs to this email before cancelling.
    const sub = await preApproval.get({ id });
    if (sub.payer_email?.toLowerCase() !== String(email).toLowerCase()) {
      return res.status(403).json({ error: "La suscripción no corresponde a este correo" });
    }

    await preApproval.update({ id, body: { status: "cancelled" } });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[mercadopago] subscription/cancel error:", err);
    return res.status(500).json({ error: "No se pudo cancelar la suscripción" });
  }
});

// POST /api/webhooks/mercadopago
// MP envía notificaciones aquí cuando cambia el estado de una suscripción o pago.
//
// Signature scheme: x-signature header is "ts=<unix>,v1=<hex_hmac_sha256>".
// The signed manifest is "id:<dataId>;request-id:<x-request-id>;ts:<ts>;"
// Hashed with HMAC-SHA256 using MP_WEBHOOK_SECRET (from MP dashboard →
// Webhooks → Configure secret). In production we hard-fail when the secret
// is missing so an unsigned request can never be accepted.
//
// Docs: https://www.mercadopago.com.mx/developers/en/docs/your-integrations/notifications/webhooks#editor_2
router.post("/webhooks/mercadopago", async (req, res) => {
  const secret = process.env.MP_WEBHOOK_SECRET;
  const isProd = process.env.NODE_ENV === "production";

  if (!secret && isProd) {
    console.error("[mercadopago] MP_WEBHOOK_SECRET requerido en producción — rechazando webhook");
    return res.status(503).send("Webhook no configurado");
  }

  if (secret) {
    const sigHeader = req.headers["x-signature"] || "";
    const requestId = req.headers["x-request-id"] || "";
    const dataId = req.query?.["data.id"] || req.body?.data?.id || "";

    const parts = String(sigHeader).split(",").reduce((acc, kv) => {
      const [k, v] = kv.split("=").map((s) => s?.trim());
      if (k && v) acc[k] = v;
      return acc;
    }, {});

    const ts = parts.ts;
    const v1 = parts.v1;

    if (!ts || !v1 || !requestId || !dataId) {
      console.warn("[mercadopago] webhook rechazado: faltan campos para validar firma");
      return res.status(400).send("Firma inválida");
    }

    const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
    const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

    const ok = expected.length === v1.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));

    if (!ok) {
      console.warn("[mercadopago] webhook rechazado: firma no coincide");
      return res.status(401).send("Firma inválida");
    }
  }

  console.log("[mercadopago] webhook:", req.body);
  // TODO: validar tipo (preapproval / subscription_authorized_payment),
  // sincronizar con BD, mandar email de confirmación.
  res.sendStatus(200);
});

export default router;
