import "dotenv/config";
import express from "express";
import cors from "cors";
import mercadopagoRouter from "./routes/mercadopago.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Comma-separated list in CORS_ORIGINS (e.g. "https://pixqui.cloud,https://www.pixqui.cloud").
// Falls back to PUBLIC_BASE_URL or localhost dev origin.
const corsOrigins = (process.env.CORS_ORIGINS || process.env.PUBLIC_BASE_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({ origin: corsOrigins }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", mercadopagoRouter);

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
