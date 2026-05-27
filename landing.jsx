// Landing page components
import React from "react";
import { createPortal } from "react-dom";
import { Icon } from "./icons.jsx";
import { CONTACT, GRADIENTS } from "./config.js";

export const NavBar = ({ t, lang, setLang, onLogin, onSignup }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="logo-mark" onClick={close}>
          PixquiCloud
        </a>
        <div className="nav-links">
          <a href="#features">{t.nav.features}</a>
          <a href="#byte">Byte AI</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="#privacy">{t.nav.privacy}</a>
          <a href="#apps">{t.nav.apps}</a>
        </div>
        <div className="nav-actions">
          <div className="lang-switch">
            <button onClick={() => setLang("es")} className={lang === "es" ? "active" : ""}>ES</button>
            <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
          </div>
          <button className="btn btn-ghost btn-sm nav-login" onClick={onLogin}>{t.nav.login}</button>
          <button className="btn btn-primary btn-sm nav-signup" onClick={onSignup}>{t.nav.signup}</button>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span style={{ transform: open ? "rotate(45deg) translate(5px,5px)" : "" }}></span>
            <span style={{ opacity: open ? 0 : 1 }}></span>
            <span style={{ transform: open ? "rotate(-45deg) translate(5px,-5px)" : "" }}></span>
          </button>
        </div>
      </div>
      {open && createPortal(
        <div className="nav-drawer" onClick={close}>
          <div className="nav-drawer-inner" onClick={e => e.stopPropagation()}>
            <a href="#features" onClick={close}>{t.nav.features}</a>
            <a href="#byte" onClick={close}>Byte AI</a>
            <a href="#pricing" onClick={close}>{t.nav.pricing}</a>
            <a href="#privacy" onClick={close}>{t.nav.privacy}</a>
            <a href="#apps" onClick={close}>{t.nav.apps}</a>
            <div className="nav-drawer-actions">
              <button className="btn btn-ghost btn-lg" onClick={() => { close(); onLogin(); }}>{t.nav.login}</button>
              <button className="btn btn-primary btn-lg" onClick={() => { close(); onSignup(); }}>{t.nav.signup}</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
};

export const Hero = ({ t, onSignup, onDemo }) => (
  <section className="hero">
    <div className="container hero-grid">
      <div>
        <div className="eyebrow"><span className="dot"></span>{t.hero.tag}</div>
        <h1 className="h-display" style={{ marginTop: 24 }}>
          {t.hero.h1a}<br/>
          <span className="accent">{t.hero.h1b}</span>
        </h1>
        <p className="subtitle">{t.hero.sub}</p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={onSignup}>
            {t.hero.cta1} <Icon name="arrow-right" size={16}/>
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onDemo}>{t.hero.cta2}</button>
        </div>
        <div className="hero-meta">
          {t.hero.stats.map((s, i) => (
            <div key={i}><span className="num">{s.num}</span>{s.label}</div>
          ))}
        </div>
      </div>
      <HeroVisual />
    </div>
    <TrustStrip text={t.trust} />
  </section>
);

export const HeroVisual = () => (
  <div className="hero-visual">
    {/* File card */}
    <div className="float-card fc-1">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(132,183,157,0.15)", display: "grid", placeItems: "center", color: "var(--green)" }}>
          <Icon name="doc" size={16}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Q2-roadmap.md</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mute)" }}>2 min ago · 24 KB</div>
        </div>
      </div>
      <div style={{ height: 4, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: "78%", height: "100%", background: "var(--green)" }}></div>
      </div>
    </div>

    {/* Photo card */}
    <div className="float-card fc-2">
      <div style={{ height: 140, borderRadius: 8, overflow: "hidden", background: "linear-gradient(135deg, #1e582e 0%, #84b79d 50%, #f3c969 100%)", marginBottom: 10, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3), transparent 50%)" }}></div>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mute)", display: "flex", justifyContent: "space-between" }}>
        <span>IMG_4521.jpg</span><span>3.2 MB</span>
      </div>
    </div>

    {/* Calendar card */}
    <div className="float-card fc-3">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontFamily: "var(--display)", fontSize: 14, fontWeight: 600 }}>Junio 2026</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mute)" }}>WEEK 24</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, fontFamily: "var(--mono)", fontSize: 9 }}>
        {Array.from({length: 28}).map((_, i) => (
          <div key={i} style={{
            aspectRatio: 1, display: "grid", placeItems: "center", borderRadius: 3,
            background: i === 11 ? "var(--green)" : (i === 14 || i === 18) ? "var(--green-deep)" : "rgba(255,255,255,0.03)",
            color: i === 11 ? "#062014" : i === 14 || i === 18 ? "var(--green-soft)" : "var(--mute)"
          }}>{i+1}</div>
        ))}
      </div>
    </div>

    {/* Talk card */}
    <div className="float-card fc-4">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-deep), var(--green))", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, color: "#062014" }}>M</div>
        <div style={{ fontSize: 11, fontWeight: 500 }}>Mariana</div>
        <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }}></div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 10px", fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-2)" }}>
        ¿subiste el deck?
      </div>
      <div style={{ background: "var(--green-deep)", color: "var(--green-soft)", borderRadius: 10, padding: "8px 10px", fontSize: 11, fontFamily: "var(--mono)", marginTop: 6, marginLeft: "auto", maxWidth: "85%", textAlign: "right" }}>
        ya, te paso el link
      </div>
    </div>
  </div>
);

const TrustStrip = ({ text }) => (
  <div className="stats-strip" style={{ marginTop: 100 }}>
    <div className="container" style={{ display: "block" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", textTransform: "uppercase", letterSpacing: "0.14em", textAlign: "center", marginBottom: 12 }}>
        {text}
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {["Polígono Studio", "Cooperativa Mxli", "Despacho Cortés", "Universidad Iberoamericana", "Bicimaps", "Ediciones Hilo", "Polígono Studio", "Cooperativa Mxli", "Despacho Cortés", "Universidad Iberoamericana", "Bicimaps", "Ediciones Hilo"].map((n,i) => (
            <span key={i}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const FeaturesSection = ({ t }) => {
  const items = t.features.items;
  const iconNames = ["files", "photos", "calendar", "contacts", "talk", "office"];
  const visuals = [
    <FeatureBars />,
    <FeaturePhotos />,
    <FeatureCalendar />,
    <FeatureContacts />,
    <FeatureTalk />,
    <FeatureOffice />,
  ];
  // layout: 6-up grid using span: 3,3 / 2,2,2 / 3,3
  const spans = ["span-3", "span-3", "span-2", "span-2", "span-2", "span-3"];
  // Adjust layout: row 1: 3+3 = 6. Row 2: 2+2+2 = 6. last item span-3 alone? let's do row1 3+3, row2 2+2+2 — that's only 6 items but last has wrong span. Use: 0:span-3, 1:span-3, 2:span-2, 3:span-2, 4:span-2 — that's 5. We have 6. Just do all span-2 in 3-col layout. Let me adjust to 3 cols.
  // Override: use 3-col grid
  return (
    <section id="features">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">{t.features.eyebrow}</div>
            <h2 className="h-section">{t.features.title}</h2>
          </div>
          <div className="right">{t.features.sub}</div>
        </div>
        <div className="feature-grid features-3">
          {items.map((item, i) => (
            <div key={i} className="feature">
              <div className="ficon"><Icon name={iconNames[i]} size={20}/></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="feature-vis">{visuals[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureBars = () => (
  <div className="vis-bars">
    {[0.4, 0.6, 0.5, 0.8, 0.65, 0.9, 0.7, 0.55].map((h, i) => (
      <span key={i} style={{ height: `${h * 100}%` }}></span>
    ))}
  </div>
);
const FeaturePhotos = () => {
  const grads = [
    "linear-gradient(135deg, #1e582e, #84b79d)",
    "linear-gradient(135deg, #f3c969, #f5ead4)",
    "linear-gradient(135deg, #84b79d, #1e582e)",
    "linear-gradient(135deg, #f5ead4, #f3c969)",
    "linear-gradient(135deg, #2c3a31, #84b79d)",
    "linear-gradient(135deg, #1e582e, #f3c969)",
    "linear-gradient(135deg, #84b79d, #f5ead4)",
    "linear-gradient(135deg, #f3c969, #1e582e)",
  ];
  return (
    <div className="vis-photogrid">
      {grads.map((g, i) => <div key={i} style={{ background: g }} />)}
    </div>
  );
};
const FeatureCalendar = () => (
  <div className="vis-cal">
    {Array.from({length: 21}).map((_, i) => (
      <div key={i} className={i === 9 ? "today" : (i === 5 || i === 14 || i === 17) ? "act" : ""}>{i+1}</div>
    ))}
  </div>
);
const FeatureContacts = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {[["MR", "Mariana Reyes", "+52 55 1234"], ["DH", "Diego Hernández", "diego@mail"], ["SC", "Sofía Cortés", "@sofiacortes"]].map(([i, n, m], idx) => (
      <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-deep), var(--green))", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 600, color: "#062014" }}>{i}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 500 }}>{n}</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--mute)" }}>{m}</div>
        </div>
      </div>
    ))}
  </div>
);
const FeatureTalk = () => (
  <div className="vis-talk">
    <div className="vis-bubble">¿reunión jueves?</div>
    <div className="vis-bubble you">10am cdmx ✓</div>
    <div className="vis-bubble">link: pxq.cloud/r/...</div>
  </div>
);
const FeatureOffice = () => (
  <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "10px 12px", fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-2)", lineHeight: 1.5 }}>
    <div style={{ color: "var(--green)" }}># Reunión Q2</div>
    <div>- KPIs revisados</div>
    <div>- Plan de migración <span style={{ background: "var(--green-deep)", color: "var(--green-soft)", padding: "1px 4px", borderRadius: 3 }}>aprobado</span></div>
    <div style={{ color: "var(--mute)" }}>3 personas editando</div>
  </div>
);

export const PreviewSection = ({ t, onTry }) => (
  <section id="preview" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)" }}>
    <div className="container">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">{t.preview.eyebrow}</div>
          <h2 className="h-section">{t.preview.title}</h2>
        </div>
        <div className="right">
          {t.preview.sub}
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-papel" onClick={onTry}>{t.preview.try} <Icon name="arrow-right" size={14}/></button>
          </div>
        </div>
      </div>
      <DashboardPreview />
    </div>
  </section>
);

const DashboardPreview = () => (
  <div className="preview-wrap">
    <div className="preview-frame dpv">
      {/* Mini topbar */}
      <div className="dpv-top">
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a4640" }}></span>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a4640" }}></span>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a4640" }}></span>
        </div>
        <div className="dpv-url">cloud.pixqui.mx / files</div>
      </div>
      <div className="dpv-body">
        <div className="dpv-side">
          <div className="logo-mark" style={{ fontSize: 13, padding: "4px 6px 16px" }}>
            <span className="dotmark" style={{ width: 18, height: 18 }}></span>PixquiCloud
          </div>
          {[
            ["files", "Archivos", true, ""],
            ["clock", "Recientes", false, ""],
            ["star", "Favoritos", false, ""],
            ["users", "Compartidos", false, "12"],
            ["photos", "Fotos", false, ""],
            ["trash", "Papelera", false, ""],
          ].map(([ic, n, act, c], i) => (
            <div key={i} className={"sb-item" + (act ? " active" : "")} style={{ fontSize: 12 }}>
              <Icon name={ic} size={14}/>{n}
              {c && <span className="count">{c}</span>}
            </div>
          ))}
        </div>
        <div className="dpv-content">
          <div style={{ fontFamily: "var(--display)", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Archivos</div>
          <div className="file-list dpv-list">
            {[
              ["doc", "Q2-roadmap.md", "hace 2 min", "24 KB", "MR"],
              ["folder", "Proyecto Polígono", "ayer", "—", "DH SC"],
              ["img", "IMG_4521.jpg", "hace 3h", "3.2 MB", ""],
              ["doc", "Contrato-2026.pdf", "lun", "1.8 MB", "SC"],
              ["video", "demo.mp4", "vie", "84 MB", ""],
            ].map(([ic, n, tm, s, sh], i) => (
              <div key={i} className="fl-row dpv-row">
                <div className="ficon-sm" style={{ width: 22, height: 22 }}><Icon name={ic} size={12}/></div>
                <div className="name dpv-name"><span>{n}</span></div>
                <div className="meta dpv-time">{tm}</div>
                <div className="meta dpv-size">{s}</div>
                <div className="shared dpv-shared">
                  {sh.split(" ").filter(Boolean).map((x, j) => (
                    <span key={j} className="dot" style={{ width: 16, height: 16, fontSize: 8 }}>{x}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PricingSection = ({ t, onSignup }) => {
  const [payPlan, setPayPlan] = React.useState(null);

  const handlePlanClick = (plan) => {
    if (plan.action === "checkout" || plan.action === "free") {
      setPayPlan(plan);
    } else if (plan.action === "contact") {
      window.location.href = "mailto:hi@pixqui.cloud?subject=Plan%20Empresa%20%E2%80%94%20PixquiCloud";
    } else {
      onSignup();
    }
  };

  return (
    <section id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">{t.pricing.eyebrow}</div>
            <h2 className="h-section">{t.pricing.titlePart1}<br/>{t.pricing.titlePart2}</h2>
          </div>
          <div className="right">{t.pricing.sub}</div>
        </div>
        <div className="pricing-grid">
          {t.pricing.plans.map((p, i) => (
            <div key={i} className={"price-card" + (p.featured ? " featured" : "")}>
              {p.featured && <div className="featured-tag">★ Popular</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-tag">{p.tag}</div>
              <div className="price">{p.price}</div>
              <div className="price-sub">{p.per}</div>
              <ul>
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <button className={"btn " + (p.featured ? "btn-primary" : "btn-ghost")} onClick={() => handlePlanClick(p)}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
      {payPlan && <PaymentModal t={t} plan={payPlan} onClose={() => setPayPlan(null)} />}
    </section>
  );
};

export const PaymentModal = ({ t, plan, onClose }) => {
  const [form, setForm] = React.useState({ name: "", email: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const p = t.pay;
  
  const isFree = plan.action === "free";

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      if (isFree) {
        // Free plan signup — send to /api/subscription/free
        const res = await fetch("/api/subscription/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        setSuccess(true);
        // Close after 2 seconds
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 2000);
      } else {
        // Paid plan — send to Mercado Pago
        const res = await fetch("/api/subscription/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: plan.id,
            payer: { name: form.name.trim(), email: form.email.trim() },
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        const data = await res.json();
        const url = data.init_point || data.sandbox_init_point;
        if (!url) throw new Error("missing init_point");
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      setError(err.message || (isFree ? "No se pudo registrarse. Intenta de nuevo." : p.form.error));
      setLoading(false);
    }
  };

  if (success && isFree) {
    return createPortal(
      <div className="contact-overlay" onClick={onClose}>
        <div className="contact-modal pay-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
          <button className="contact-close" onClick={onClose} aria-label={p.close}>×</button>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>✓</div>
            <h3 style={{ color: "var(--green)", margin: "0 0 10px 0" }}>¡Registro exitoso!</h3>
            <p>Te enviamos un correo de confirmación a <strong>{form.email}</strong></p>
            <p style={{ color: "var(--mute)", fontSize: 14 }}>Tu cuenta será creada en 12-24 horas</p>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-modal pay-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="contact-close" onClick={onClose} aria-label={p.close}>×</button>

        <h3>{p.form.title}</h3>
        <p className="contact-sub">
          {isFree 
            ? "Sin tarjeta de crédito · Tu cuenta será creada en 12-24 horas"
            : `${p.sub} · `}
          <strong style={{ color: "var(--green)" }}>{plan.name} {plan.price}</strong>
        </p>
        <form className="pay-form" onSubmit={handleSubmit}>
          <label>
            <span>{p.form.plan}</span>
            <input type="text" value={`${plan.name} — ${plan.price} ${plan.per}`} disabled />
          </label>
          <label>
            <span>{p.form.name}</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoFocus
            />
          </label>
          <label>
            <span>{p.form.email}</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          {error && <div className="pay-error">{error}</div>}
          <p className="pay-disclaimer">
            {isFree 
              ? "Te enviaremos un correo cuando tu cuenta esté lista. Si tienes preguntas, escríbenos a hi@pixqui.cloud"
              : p.form.disclaimer}
          </p>
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
            {loading 
              ? (isFree ? "Registrando..." : p.form.loading)
              : (isFree ? "Registrarse" : p.form.submit)}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export const PrivacySection = ({ t }) => {
  const beforeText = `Q2-roadmap.md
"Plan estratégico Q2 2026
- Migrar de Drive
- Implementar SSO
- Lanzar app móvil"`;
  const afterText = `U2FsdGVkX1+zL9k4mP/aB
xN7H8vK2fW3eR5tY9Q
oT6jKpL3nM8sB4dC2v
H1xZ7kQ9wE5rT3yU6i`;

  const [phase, setPhase] = React.useState("idle"); // idle | typingBefore | encrypting | typingAfter | done
  const [beforeShown, setBeforeShown] = React.useState("");
  const [afterShown, setAfterShown] = React.useState("");
  const ref = React.useRef(null);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setPhase("typingBefore");
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (phase === "typingBefore") {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setBeforeShown(beforeText.slice(0, i));
        if (i >= beforeText.length) {
          clearInterval(id);
          setTimeout(() => setPhase("encrypting"), 600);
        }
      }, 22);
      return () => clearInterval(id);
    }
    if (phase === "encrypting") {
      setTimeout(() => setPhase("typingAfter"), 800);
    }
    if (phase === "typingAfter") {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setAfterShown(afterText.slice(0, i));
        if (i >= afterText.length) {
          clearInterval(id);
          setPhase("done");
        }
      }, 18);
      return () => clearInterval(id);
    }
  }, [phase]);

  const showCaret = (p) => phase === p;

  return (
    <section id="privacy" className="privacy">
      <div className="container">
        <div className="privacy-card">
          <div>
            <div className="eyebrow">{t.privacy.eyebrow}</div>
            <h2 className="h-section" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 16 }}>{t.privacy.title}</h2>
            <p className="subtitle" style={{ marginTop: 20 }}>{t.privacy.sub}</p>
            <div className="privacy-pills">
              {t.privacy.pills.map((p, i) => <span key={i} className="pill"><Icon name="check" size={11}/>{p}</span>)}
            </div>
          </div>
          <div className="enc-vis" ref={ref}>
            <div className="lock"><Icon name="lock" size={18}/></div>
            <div className="label">// before</div>
            <pre style={{ color: "var(--ink-2)", marginBottom: 16, minHeight: 110 }}>
              {beforeShown}{showCaret("typingBefore") && <span style={{ background: "var(--ink-2)", display: "inline-block", width: 7, height: 13, marginLeft: 1, animation: "blink 1s step-end infinite" }}></span>}
            </pre>
            <div className="label">
              // after AES-256-GCM
              {phase === "encrypting" && <span style={{ marginLeft: 8, color: "var(--green)" }}>cifrando...</span>}
            </div>
            <pre style={{ minHeight: 80 }}>
              {afterShown}{showCaret("typingAfter") && <span style={{ background: "var(--green)", display: "inline-block", width: 7, height: 13, marginLeft: 1, animation: "blink 1s step-end infinite" }}></span>}
            </pre>
            <style>{`@keyframes blink { 0%,50% { opacity: 1; } 50.01%,100% { opacity: 0; } }`}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MobileSection = ({ t }) => (
  <section id="apps" className="mobile-section">
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", display: "block", marginBottom: 0 }}>
        <div className="eyebrow" style={{ display: "block", marginBottom: 16 }}>{t.mobile.eyebrow}</div>
        <h2 className="h-section">{t.mobile.title}</h2>
        <p className="subtitle" style={{ margin: "20px auto 0" }}>{t.mobile.sub}</p>
      </div>
      <div className="phone-row">
        <div className="phone" style={{ transform: "rotate(-3deg)" }}>
          <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 44, paddingTop: 16, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, color: "var(--ink)", textAlign: "center" }}>9:41</div>
            <div style={{ padding: "16px 20px", fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>Archivos</div>
            <div style={{ padding: "0 20px" }}>
              {[
                ["doc", "Q2-roadmap.md", "24 KB"],
                ["folder", "Polígono", "12 archivos"],
                ["img", "IMG_4521", "3.2 MB"],
                ["doc", "Contrato.pdf", "1.8 MB"],
                ["video", "demo.mp4", "84 MB"],
              ].map(([ic, n, s], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--panel)", display: "grid", placeItems: "center", color: "var(--green)" }}>
                    <Icon name={ic} size={14}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{n}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mute)" }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="phone" style={{ transform: "rotate(0deg) translateY(-12px)" }}>
          <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 44, paddingTop: 16, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, textAlign: "center" }}>9:41</div>
            <div style={{ padding: "16px 20px", fontFamily: "var(--display)", fontSize: 24, fontWeight: 600 }}>Fotos</div>
            <div style={{ padding: "0 12px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ aspectRatio: 1, borderRadius: 4, background: GRADIENTS[i % GRADIENTS.length] }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="phone" style={{ transform: "rotate(3deg)" }}>
          <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 44, paddingTop: 16, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, textAlign: "center" }}>9:41</div>
            <div style={{ padding: "16px 20px", fontFamily: "var(--display)", fontSize: 24, fontWeight: 600 }}>Talk</div>
            <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["MR", "Mariana", "ya subí el archivo", "9:32"],
                ["DH", "Diego", "📷 enviada", "8:14"],
                ["SC", "Sofía", "nos vemos jueves", "ayer"],
                ["EQ", "Equipo Polígono", "5 mensajes nuevos", "ayer"],
              ].map(([i, n, m, ts], idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-deep), var(--green))", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, color: "#062014" }}>{i}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 500 }}>
                      <span>{n}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--mute)" }}>{ts}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--mute)" }}>{m}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const TestimonialsSection = ({ t }) => (
  <section>
    <div className="container">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">{t.testimonials.eyebrow}</div>
          <h2 className="h-section">{t.testimonials.title}</h2>
        </div>
      </div>
      <div className="tm-grid">
        {t.testimonials.items.map((tm, i) => (
          <div key={i} className="tm-card">
            <div className="quote">"{tm.quote}"</div>
            <div className="person">
              <div className="avatar">{tm.name.split(" ").map(s => s[0]).slice(0,2).join("")}</div>
              <div>
                <div className="name">{tm.name}</div>
                <div className="role">{tm.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQSection = ({ t }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">{t.faq.eyebrow}</div>
            <h2 className="h-section">{t.faq.title}</h2>
          </div>
        </div>
        <div className="faq-list">
          {t.faq.items.map((it, i) => (
            <div key={i} className={"faq-item" + (open === i ? " open" : "")} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                <span>{it.q}</span>
                <span className="plus"><Icon name="plus" size={14}/></span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = ({ t, onSignup }) => (
  <section className="final-cta">
    <div className="container">
      <h2 className="h-display">
        {t.cta.h1a}<br/>
        <span className="accent">{t.cta.h1b}</span>
      </h2>
      <p className="subtitle" style={{ margin: "20px auto 36px" }}>{t.cta.sub}</p>
      <button className="btn btn-primary btn-lg" onClick={onSignup}>
        {t.cta.btn} <Icon name="arrow-right" size={16}/>
      </button>
    </div>
  </section>
);

export const ContactModal = ({ t, onClose }) => {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  const c = t.footer.contact;
  const waMsg = encodeURIComponent("Hola PixquiCloud, me gustaría más información.");
  return createPortal(
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="contact-close" onClick={onClose} aria-label={c.close}>×</button>
        <h3 id="contact-title">{c.title}</h3>
        <p className="contact-sub">{c.sub}</p>
        <div className="contact-options">
          <a className="contact-option" href={`tel:${CONTACT.phoneTel}`}>
            <Icon name="phone" size={20} />
            <div>
              <strong>{c.call}</strong>
              <span>{CONTACT.phone}</span>
            </div>
          </a>
          <a className="contact-option" href={`https://wa.me/${CONTACT.whatsappWa}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
            <Icon name="message" size={20} />
            <div>
              <strong>{c.whatsapp}</strong>
              <span>{CONTACT.whatsapp}</span>
            </div>
          </a>
          <a className="contact-option" href={`mailto:${CONTACT.email}`}>
            <Icon name="mail" size={20} />
            <div>
              <strong>{c.email}</strong>
              <span>{CONTACT.email}</span>
            </div>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const Footer = ({ t }) => {
  const [contactOpen, setContactOpen] = React.useState(false);
  return (
    <footer>
      <div className="container">
        <div className="footer-grid footer-grid-3">
          <div className="footer-brand">
            <a href="#" className="footer-logo" aria-label="PixquiCloud — inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <img src="/icons/favicon.svg" alt="PixquiCloud" />
            </a>
            <p className="footer-help">{t.footer.brand}</p>
            {t.footer.email && (
              <a href={`mailto:${t.footer.email}`} className="footer-email">{t.footer.email}</a>
            )}
          </div>
          {t.footer.cols.map((col, i) => (
            <div key={i} className="footer-col">
              <h4>{col.title}</h4>
              {col.links.map((l, j) => {
                if (l.href === "#contact") {
                  return <a key={j} href="#contact" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>{l.label}</a>;
                }
                const ext = /^https?:\/\//.test(l.href);
                return <a key={j} href={l.href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{l.label}</a>;
              })}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>{t.footer.bottom}</span>
          <span>v 2026.4</span>
        </div>
      </div>
      {contactOpen && <ContactModal t={t} onClose={() => setContactOpen(false)} />}
    </footer>
  );
};
