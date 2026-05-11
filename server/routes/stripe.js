import { Router, raw } from "express";
import Stripe from "stripe";
import { PLANS } from "../plans.js";

const router = Router();

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" })
  : null;

if (!stripe) {
  console.warn("[stripe] STRIPE_SECRET_KEY no configurado — endpoints de Stripe deshabilitados");
}

const requireStripe = (req, res, next) => {
  if (!stripe) return res.status(503).json({ error: "Stripe no está configurado en el servidor" });
  next();
};

const baseUrl = () =>
  process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 5173}`;

// POST /api/stripe/checkout
// body: { planId, payer: { email, name } }
// returns: { id, url }
router.post("/stripe/checkout", requireStripe, async (req, res) => {
  try {
    const { planId, payer } = req.body || {};
    const plan = PLANS[planId];
    if (!plan) return res.status(400).json({ error: "Plan inválido" });
    if (!payer?.email) return res.status(400).json({ error: "Falta email del pagador" });
    if (!plan.stripe_price_id) {
      return res.status(500).json({ error: "Stripe price ID no configurado para este plan" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: payer.email,
      line_items: [{ price: plan.stripe_price_id, quantity: 1 }],
      client_reference_id: `${plan.id}-${Date.now()}`,
      metadata: {
        plan_id: plan.id,
        payer_name: payer.name || "",
      },
      subscription_data: {
        metadata: {
          plan_id: plan.id,
          payer_email: payer.email,
          payer_name: payer.name || "",
        },
      },
      success_url: `${baseUrl()}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl()}/failure.html`,
      allow_promotion_codes: true,
    });

    return res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("[stripe] checkout error:", err);
    const dev = process.env.NODE_ENV !== "production";
    return res.status(500).json({
      error: "No se pudo crear la sesión de pago",
      ...(dev && { debug: { message: err?.message, code: err?.code } }),
    });
  }
});

// GET /api/stripe/subscription/list?email=X
router.get("/stripe/subscription/list", requireStripe, async (req, res) => {
  try {
    const { email } = req.query || {};
    if (!email) return res.status(400).json({ error: "Falta email" });

    const customers = await stripe.customers.list({ email: String(email), limit: 10 });
    const items = [];
    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 20,
      });
      for (const s of subs.data) {
        if (!["active", "trialing", "past_due"].includes(s.status)) continue;
        const item = s.items.data[0];
        items.push({
          id: s.id,
          reason: item?.price?.nickname || s.metadata?.plan_id || "Suscripción",
          status: s.status,
          amount: (item?.price?.unit_amount || 0) / 100,
          currency: item?.price?.currency?.toUpperCase(),
          frequency: item?.price?.recurring?.interval_count,
          frequency_type: item?.price?.recurring?.interval,
          next_payment_date: s.current_period_end
            ? new Date(s.current_period_end * 1000).toISOString()
            : null,
          date_created: new Date(s.created * 1000).toISOString(),
        });
      }
    }

    return res.json({ items });
  } catch (err) {
    console.error("[stripe] subscription/list error:", err);
    return res.status(500).json({ error: "No se pudieron listar las suscripciones" });
  }
});

// POST /api/stripe/subscription/cancel
// body: { id, email }
router.post("/stripe/subscription/cancel", requireStripe, async (req, res) => {
  try {
    const { id, email } = req.body || {};
    if (!id || !email) return res.status(400).json({ error: "Faltan datos" });

    const sub = await stripe.subscriptions.retrieve(id, { expand: ["customer"] });
    const customerEmail = sub.customer?.email || sub.metadata?.payer_email;
    if (customerEmail?.toLowerCase() !== String(email).toLowerCase()) {
      return res.status(403).json({ error: "La suscripción no corresponde a este correo" });
    }

    await stripe.subscriptions.cancel(id);
    return res.json({ ok: true });
  } catch (err) {
    console.error("[stripe] subscription/cancel error:", err);
    return res.status(500).json({ error: "No se pudo cancelar la suscripción" });
  }
});

// POST /api/webhooks/stripe — needs raw body for signature verification.
export const stripeWebhookHandler = [
  raw({ type: "application/json" }),
  (req, res) => {
    if (!stripe) return res.status(503).send("Stripe no está configurado");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    const isProd = process.env.NODE_ENV === "production";
    if (!secret && isProd) {
      console.error("[stripe] STRIPE_WEBHOOK_SECRET requerido en producción — rechazando webhook");
      return res.status(503).send("Webhook no configurado");
    }
    let event;
    try {
      if (secret) {
        const sig = req.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(req.body, sig, secret);
      } else {
        event = JSON.parse(req.body.toString("utf8"));
      }
    } catch (err) {
      console.error("[stripe] webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("[stripe] webhook:", event.type, event.id);
    // TODO: persist subscription state, send confirmation emails.
    res.sendStatus(200);
  },
];

export default router;
