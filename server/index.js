import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mercadopagoRouter from "./routes/mercadopago.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Trust the first proxy (Cloudflare → aaPanel nginx → us). Without this,
// req.ip is the proxy's IP and rate-limit dedups everyone into one bucket.
app.set("trust proxy", 1);

// Comma-separated list in CORS_ORIGINS (e.g. "https://pixqui.cloud,https://www.pixqui.cloud").
// Falls back to PUBLIC_BASE_URL or localhost dev origins.
let corsOrigins = (process.env.CORS_ORIGINS || process.env.PUBLIC_BASE_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// In development, allow any localhost port
if (process.env.NODE_ENV !== "production") {
  corsOrigins.push(/^http:\/\/localhost(:\d+)?$/);
}

app.use(helmet());
app.use(cors({ origin: corsOrigins }));
app.use(express.json());

// Throttle public subscription endpoints. Webhooks and health are exempt.
const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/subscription", publicLimiter);
app.use("/api", mercadopagoRouter);

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
