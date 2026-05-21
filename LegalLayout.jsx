import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LEGAL_I18N } from "./i18n-legal.js";

const RelatedIcon = ({ type }) => {
  if (type === "file") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
  if (type === "check-circle") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
};

export const LegalLayout = ({ lang, setLang, page, children }) => {
  const tn = LEGAL_I18N[lang].nav;
  const tf = LEGAL_I18N[lang].footer;
  const tp = LEGAL_I18N[lang][page];

  useEffect(() => {
    localStorage.setItem("pxq_lang", lang);
  }, [lang]);

  useEffect(() => {
    const links = document.querySelectorAll(".legal-toc a");
    const sections = document.querySelectorAll(".legal-content h2");
    if (!links.length || !sections.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [lang]);

  useEffect(() => {
    const els = document.querySelectorAll(
      ".legal-content h2, .legal-content h3, .legal-content p, .legal-content ul, .legal-content ol, .legal-callout, .legal-related, .legal-footer-cta, .legal-table-wrap, .legal-content blockquote"
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });
    const ro = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [lang]);

  return (
    <>
      <Helmet>
        <title>{tp.pageTitle}</title>
      </Helmet>

      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="logo-mark">PixquiCloud</a>
          <div className="nav-links">
            <a href="/#features">{tn.features}</a>
            <a href="/#byte">{tn.byte}</a>
            <a href="/#pricing">{tn.pricing}</a>
            <a href="/#privacy">{tn.privacy}</a>
          </div>
          <div className="nav-actions">
            <div className="lang-switch">
              <button onClick={() => setLang("es")} className={lang === "es" ? "active" : ""}>ES</button>
              <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
            </div>
            <a href="/" className="btn btn-ghost btn-sm">{tn.back}</a>
            <a href="/#pricing" className="btn btn-primary btn-sm">{tn.signup}</a>
          </div>
        </div>
      </nav>

      <main className="legal-page">
        <section className="legal-hero">
          <div className="container">
            <div className="crumbs-row">
              <a href="/">{tp.crumbs[0]}</a>
              <span className="sep">/</span>
              <span>{tp.crumbs[1]}</span>
              <span className="sep">/</span>
              <span className="current">{tp.crumbs[2]}</span>
            </div>
            <h1>{tp.h1[0]}<span className="accent">{tp.h1[1]}</span></h1>
            <p>{tp.subtitle}</p>
            <div className="legal-meta">
              {tp.meta.map((m, i) => (
                <div key={i}>{m.label} <strong>{m.value}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="legal-body">
          <div className="container">
            <div className="legal-grid">
              <aside className="legal-toc">
                <h4>{tp.toc.heading}</h4>
                <ol>
                  {tp.toc.items.map((item, i) => (
                    <li key={i}><a href={item.href}>{item.label}</a></li>
                  ))}
                </ol>
              </aside>

              <article className="legal-content">
                {children}

                <div className="legal-related">
                  {tp.related.map((doc, i) => (
                    <a key={i} href={doc.href} className="legal-related-card">
                      <div className="ic"><RelatedIcon type={doc.iconType} /></div>
                      <div className="info">
                        <h5>{doc.title}</h5>
                        <p>{doc.subtitle}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="legal-footer-cta">
                  <h3>{tp.footerCta.heading}</h3>
                  <p>{tp.footerCta.text}</p>
                  <div className="btns">
                    <a href={tp.footerCta.primaryHref} className="btn btn-primary">{tp.footerCta.primaryLabel}</a>
                    <a href="/" className="btn btn-ghost">{tp.footerCta.secondaryLabel}</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid footer-grid-3">
            <div className="footer-brand">
              <a href="/" className="footer-logo" aria-label="PixquiCloud — inicio">
                <img src="assets/footer-logo.png" alt="PixquiCloud" />
              </a>
              <p className="footer-help">{tf.help}</p>
              <a href="mailto:hi@pixqui.cloud" className="footer-email">hi@pixqui.cloud</a>
            </div>
            <div className="footer-col">
              <h4>{tf.company}</h4>
              <a href="https://xolotl.tech/" target="_blank" rel="noopener noreferrer">{tf.about}</a>
              <a href="https://xolotl.tech/unete" target="_blank" rel="noopener noreferrer">{tf.careers}</a>
              <a href="mailto:hi@pixqui.cloud">{tf.contact}</a>
            </div>
            <div className="footer-col">
              <h4>{tf.legal}</h4>
              <a href="/privacidad">{tf.privacyLink}</a>
              <a href="/terminos">{tf.termsLink}</a>
              <a href="/condiciones">{tf.usageLink}</a>
              <a href="/cancelar">{tf.cancelLink}</a>
            </div>
            <div className="footer-col">
              <h4>{tf.follow}</h4>
              <a href="https://www.instagram.com/xolotl_tech" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.tiktok.com/@xolotl_tech" target="_blank" rel="noopener noreferrer">Tiktok</a>
              <a href="https://mx.linkedin.com/company/xolotl-tech" target="_blank" rel="noopener noreferrer">Linkedin</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{tf.copy}</span>
            <span>v 2026.4</span>
          </div>
        </div>
      </footer>
    </>
  );
};
