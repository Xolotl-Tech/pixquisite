// Root app — orchestrates landing, auth, dashboard

const { useState, useEffect } = React;

const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("pxq_lang") || "es");
  const [authMode, setAuthMode] = useState(null); // null | 'login' | 'signup'
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pxq_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState(() => {
    return localStorage.getItem("pxq_user") ? "app" : "landing";
  });
  const [toast, setToast] = useState(null);
  const [initialFile, setInitialFile] = useState(null);

  const t = window.I18N[lang];

  useEffect(() => { localStorage.setItem("pxq_lang", lang); }, [lang]);
  useEffect(() => {
    if (user) localStorage.setItem("pxq_user", JSON.stringify(user));
    else localStorage.removeItem("pxq_user");
  }, [user]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleAuth = (data) => {
    const u = { name: data.name || "María González", email: data.email || "maria@pixqui.cloud", workspace: data.workspace || "mi-nube", region: data.region || "MX-Centro" };
    setUser(u);
    setAuthMode(null);
    setView("app");
    setTimeout(() => showToast(t.app.welcomeToast), 400);
  };

  const handleLogout = () => {
    setUser(null);
    setView("landing");
  };

  const handleDemo = () => {
    // Demo without signup — preview the dashboard
    handleAuth({ name: "María González", email: "demo@pixqui.cloud", workspace: "demo", region: "MX-Centro" });
  };

  if (view === "app" && user) {
    return (
      <>
        <Dashboard t={t} lang={lang} user={user} onLogout={handleLogout} onHome={() => setView("landing")} showToast={showToast} initialFile={initialFile} />
        {toast && (
          <div className="toast">
            <div className="ti"><Icon name="check" size={14}/></div>
            {toast}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <NavBar t={t} lang={lang} setLang={setLang} onLogin={() => window.open("https://app.pixqui.cloud/", "_blank")} onSignup={() => setAuthMode("signup")} />
      <Hero t={t} onSignup={() => setAuthMode("signup")} onDemo={handleDemo} />
      <FeaturesSection t={t} />
      <ByteSection t={t} lang={lang} onSignup={() => setAuthMode("signup")} />
      <PreviewSection t={t} onTry={handleDemo} />
      <PricingSection t={t} onSignup={() => setAuthMode("signup")} />
      <PrivacySection t={t} />
      <MobileSection t={t} />
      <TestimonialsSection t={t} />
      <FAQSection t={t} />
      <FinalCTA t={t} onSignup={() => setAuthMode("signup")} />
      <Footer t={t} />
      {authMode && (
        <AuthModal t={t} mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} onAuth={handleAuth} />
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// Scroll-reveal: fade in from bottom on scroll
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  const tag = () => {
    // Tag landing-level elements: sections + major cards
    const selectors = [
      "section .container > .section-head",
      "section .feature",
      "section .price-card",
      "section .tm-card",
      "section .faq-item",
      ".byte-grid > div",
      ".privacy-card",
      ".phone",
      ".preview-wrap",
      ".final-cta .container > *",
      ".hero-meta",
      ".hero-cta",
      ".hero h1",
      ".hero .subtitle",
      ".hero .eyebrow",
      ".stats-strip",
      "footer .footer-grid > *",
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      // Stagger siblings within the same parent
      const idx = Array.from(el.parentElement.children).indexOf(el);
      el.style.transitionDelay = (Math.min(idx, 5) * 70) + "ms";
      observer.observe(el);
    });
  };

  // Tag now and again as React mounts/updates
  tag();
  setTimeout(tag, 100);
  setTimeout(tag, 400);

  // Re-tag when view changes (landing <-> app)
  const mo = new MutationObserver(() => tag());
  mo.observe(document.getElementById("root"), { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupReveal);
} else {
  setupReveal();
}
