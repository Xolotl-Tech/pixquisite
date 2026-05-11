import "dotenv/config";
import express from "express";
import cors from "cors";
import mercadopagoRouter from "./routes/mercadopago.js";
import stripeRouter, { stripeWebhookHandler } from "./routes/stripe.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Comma-separated list in CORS_ORIGINS (e.g. "https://pixqui.cloud,https://www.pixqui.cloud").
// Falls back to PUBLIC_BASE_URL or localhost dev origin.
const corsOrigins = (process.env.CORS_ORIGINS || process.env.PUBLIC_BASE_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({ origin: corsOrigins }));

// Stripe webhook must be mounted before express.json() to preserve the raw body for signature verification.
app.post("/api/webhooks/stripe", ...stripeWebhookHandler);

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", mercadopagoRouter);
app.use("/api", stripeRouter);

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
