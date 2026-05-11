import "dotenv/config";
import express from "express";
import cors from "cors";
import mercadopagoRouter from "./routes/mercadopago.js";
import stripeRouter, { stripeWebhookHandler } from "./routes/stripe.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.PUBLIC_BASE_URL || "http://localhost:5173" }));

// Stripe webhook must be mounted before express.json() to preserve the raw body for signature verification.
app.post("/api/webhooks/stripe", ...stripeWebhookHandler);

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", mercadopagoRouter);
app.use("/api", stripeRouter);

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
