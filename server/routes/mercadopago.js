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

// POST /api/subscription/create
// body: { planId, payer: { email, name } }
// returns: { id, init_point }
router.post("/subscription/create", async (req, res) => {
  try {
    const { planId, payer } = req.body || {};
    const plan = PLANS[planId];
    if (!plan) return res.status(400).json({ error: "Plan inválido" });
    if (!payer?.email) return res.status(400).json({ error: "Falta email del pagador" });

    const result = await preApproval.create({
      body: {
        reason: `PixquiCloud — ${plan.title}`,
        external_reference: `${plan.id}-${Date.now()}`,
        payer_email: payer.email,
        back_url: `${baseUrl()}/success.html`,
        notification_url: `${baseUrl()}/api/webhooks/mercadopago`,
        auto_recurring: {
          frequency: plan.frequency,
          frequency_type: plan.frequency_type,
          transaction_amount: plan.transaction_amount,
          currency_id: plan.currency_id,
        },
        status: "pending",
      },
    });

    return res.json({
      id: result.id,
      init_point: result.init_point,
      status: result.status,
    });
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
