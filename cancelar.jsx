// Self-service subscription cancellation page.
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { I18N } from "./i18n.js";
import "./fonts.js";
import "./styles.css";
import "./legal.css";

const CancelPage = () => {
  const lang = localStorage.getItem("pxq_lang") || "es";
  const t = I18N[lang].cancel;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [cancelledIds, setCancelledIds] = useState(new Set());
  const [cancelling, setCancelling] = useState(null);

  const lookup = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    setItems(null);
    try {
      const res = await fetch(`/api/subscription/list?email=${encodeURIComponent(email.trim())}`);
      if (!res.ok) throw new Error("lookup failed");
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    setCancelling(id);
    setError(null);
    try {
      const res = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email: email.trim() }),
      });
      if (!res.ok) throw new Error("cancel failed");
      setCancelledIds((prev) => new Set(prev).add(id));
    } catch {
      setError(t.error);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <main className="legal-page">
      <nav className="nav">
        <div className="container nav-inner">
          <a href="index.html" className="logo-mark">PixquiCloud</a>
          <div className="nav-actions">
            <a href="index.html" className="btn btn-ghost btn-sm">Volver</a>
          </div>
        </div>
      </nav>
      <section className="legal-hero" style={{ borderBottom: 0 }}>
        <div className="container" style={{ paddingTop: 60, paddingBottom: 48 }}>
          <h1>{t.title}</h1>
          <p style={{ maxWidth: 560 }}>{t.sub}</p>

          <form onSubmit={lookup} style={{ marginTop: 32, maxWidth: 480 }}>
            <label className="cancel-label">
              <span>{t.emailLabel}</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                autoFocus
              />
            </label>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: 16 }}>
              {loading ? t.loading : t.lookup}
            </button>
          </form>

          {error && <div className="pay-error" style={{ marginTop: 24, maxWidth: 480 }}>{error}</div>}

          {items && items.length === 0 && (
            <p className="cancel-empty" style={{ marginTop: 32 }}>{t.none}</p>
          )}

          {items && items.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 16 }}>
                {t.activeTitle}
              </h3>
              <div className="cancel-list">
                {items.map((s) => {
                  const cancelled = cancelledIds.has(s.id);
                  return (
                    <div key={s.id} className={"cancel-card" + (cancelled ? " cancelled" : "")}>
                      <div className="cancel-card-info">
                        <strong>{s.reason}</strong>
                        <div className="cancel-card-meta">
                          <span>{t.amount}: ${s.amount} {s.currency} / {s.frequency} {s.frequency_type === "months" ? "mes" : s.frequency_type}</span>
                          {s.next_payment_date && <span>{t.next}: {new Date(s.next_payment_date).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      {cancelled ? (
                        <span className="cancel-done">✓ {t.cancelled}</span>
                      ) : (
                        <button
                          className="btn btn-ghost"
                          onClick={() => cancel(s.id)}
                          disabled={cancelling === s.id}
                        >
                          {cancelling === s.id ? t.cancelling : t.cancelBtn}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

createRoot(document.getElementById("root")).render(<CancelPage />);
