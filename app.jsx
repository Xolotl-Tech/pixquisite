import React, { useState, useEffect } from "react";
import { I18N } from "./i18n.js";
import { Icon } from "./icons.jsx";
import {
  NavBar, Hero, FeaturesSection, PreviewSection, PricingSection,
  PrivacySection, MobileSection, TestimonialsSection, FAQSection,
  FinalCTA, Footer,
} from "./landing.jsx";
import { ByteSection } from "./byte.jsx";
import { Dashboard } from "./dashboard.jsx";
import "./styles.css";
import "./app.css";
import "./byte.css";

const DEMO_USER = { name: "María González", email: "demo@pixqui.cloud", workspace: "demo", region: "MX-Centro" };

const REVEAL_SELECTORS = [
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

export const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("pxq_lang") || "es");
  const [view, setView] = useState("landing");
  const [toast, setToast] = useState(null);

  const t = I18N[lang];

  useEffect(() => { localStorage.setItem("pxq_lang", lang); }, [lang]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    const tag = () => {
      document.querySelectorAll(REVEAL_SELECTORS.join(",")).forEach((el) => {
        if (el.classList.contains("reveal")) return;
        el.classList.add("reveal");
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.style.transitionDelay = (Math.min(idx, 5) * 70) + "ms";
        observer.observe(el);
      });
    };

    tag();
    const t1 = setTimeout(tag, 100);
    const t2 = setTimeout(tag, 400);
    const mo = new MutationObserver(() => tag());
    mo.observe(document.getElementById("root"), { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [view]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleLogin = () => window.open("https://app.pixqui.cloud/", "_blank");

  const handleSignup = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDemo = () => {
    setView("app");
    setTimeout(() => showToast(t.app.welcomeToast), 400);
  };

  const handleExitDemo = () => setView("landing");

  if (view === "app") {
    return (
      <>
        <Dashboard t={t} lang={lang} user={DEMO_USER} onLogout={handleExitDemo} onHome={handleExitDemo} showToast={showToast} initialFile={null} />
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
      <NavBar t={t} lang={lang} setLang={setLang} onLogin={handleLogin} onSignup={handleSignup} />
      <Hero t={t} onSignup={handleSignup} onDemo={handleDemo} />
      <FeaturesSection t={t} />
      <ByteSection t={t} lang={lang} onSignup={handleSignup} />
      <PreviewSection t={t} onTry={handleDemo} />
      <PricingSection t={t} onSignup={handleSignup} />
      <PrivacySection t={t} />
      <MobileSection t={t} />
      <TestimonialsSection t={t} />
      <FAQSection t={t} />
      <FinalCTA t={t} onSignup={handleSignup} />
      <Footer t={t} />
    </>
  );
};
