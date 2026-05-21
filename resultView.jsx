// Shared layout for /success, /pending, /failure post-payment pages.
// Reads query params from MP redirect to render the right state.
import React from "react";
import { I18N } from "./i18n.js";

const COLORS = {
  success: { ring: "rgba(132,183,157,0.4)", bg: "rgba(132,183,157,0.12)", stroke: "#84b79d" },
  pending: { ring: "rgba(243,201,105,0.4)", bg: "rgba(243,201,105,0.12)", stroke: "#f3c969" },
  failure: { ring: "rgba(220,90,90,0.4)", bg: "rgba(220,90,90,0.12)", stroke: "#dc5a5a" },
  unknown: { ring: "rgba(160,160,160,0.4)", bg: "rgba(160,160,160,0.12)", stroke: "#a0a0a0" },
};

const ICONS = {
  success: <polyline points="20 6 9 17 4 12" />,
  pending: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  failure: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  unknown: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
};

// MP redirect query → which view to render.
// PreApproval back_url receives ?preapproval_id=...&status=...
// status can be: authorized, pending, cancelled, paused, etc.
const kindFromStatus = (status, fallback) => {
  if (!status) return fallback;
  const s = String(status).toLowerCase();
  if (["authorized", "approved", "active"].includes(s)) return "success";
  if (["pending", "in_process"].includes(s)) return "pending";
  if (["cancelled", "rejected", "paused"].includes(s)) return "failure";
  return "unknown";
};

export const ResultView = ({ defaultKind }) => {
  const lang = (typeof localStorage !== "undefined" && localStorage.getItem("pxq_lang")) || "es";
  const t = I18N[lang].result;

  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const status = params.get("status") || params.get("collection_status");
  const refId = params.get("preapproval_id") || params.get("collection_id") || params.get("payment_id");
  const kind = kindFromStatus(status, defaultKind);

  const c = COLORS[kind];
  const copy = t[kind];

  return (
    <main className="legal-page">
      <section className="legal-hero" style={{ borderBottom: 0 }}>
        <div className="container" style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: c.bg, border: `1px solid ${c.ring}`,
            display: "inline-grid", placeItems: "center", marginBottom: 24,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[kind]}
            </svg>
          </div>
          <h1>{copy.title} <span className="accent">{copy.titleAccent}</span></h1>
          <p style={{ maxWidth: 560, margin: "0 auto" }}>
            {kind === "failure" ? (
              <>{copy.bodyPre}<a href={`mailto:${copy.bodyEmail}`}>{copy.bodyEmail}</a>{copy.bodyPost}</>
            ) : (
              copy.body
            )}
          </p>
          {refId && (
            <p style={{ marginTop: 16, fontFamily: "var(--mono)", fontSize: 12, color: "var(--mute)" }}>
              {t.refId}: {refId}
            </p>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            {kind === "success" && (
              <>
                <a href="/" className="btn btn-primary">{t.backHome}</a>
                <a href="https://app.pixqui.cloud/" className="btn btn-ghost">{t.goToCloud}</a>
              </>
            )}
            {kind === "pending" && (
              <a href="/" className="btn btn-primary">{t.backHome}</a>
            )}
            {(kind === "failure" || kind === "unknown") && (
              <>
                <a href="/#pricing" className="btn btn-primary">{t.tryAgain}</a>
                <a href="/" className="btn btn-ghost">{t.backHome}</a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
