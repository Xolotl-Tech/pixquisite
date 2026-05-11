// Dashboard app — sidebar + topbar + file list + file preview
import React from "react";
import { Icon } from "./icons.jsx";
import { GRADIENTS } from "./config.js";

const SAMPLE_FILES = [
  { id: "f1", icon: "doc", type: "doc", name: "Q2-roadmap.md", modified: "hace 2 min", modifiedEn: "2 min ago", size: "24 KB", shared: ["MR"], starred: true, encrypted: true,
    content: { title: "Q2 Roadmap — PixquiCloud", body: [
      { type: "h2", text: "Objetivos del trimestre" },
      { type: "p", text: "Tres prioridades para Q2 2026: completar la migración desde Google Drive para los equipos legacy, lanzar el flujo de SSO empresarial, y dejar listas las apps móviles para iOS 18 y Android 15." },
      { type: "h2", text: "Migración" },
      { type: "p", text: "Continuamos el trabajo del trimestre pasado. La meta es 95% de cuentas migradas para el 30 de junio. El asistente de un clic ya cubre Drive, OneDrive, Dropbox e iCloud — falta validar permisos compartidos en grupos grandes." },
      { type: "h2", text: "SSO empresarial" },
      { type: "p", text: "SAML 2.0 + OIDC. Integraciones con Okta, Google Workspace y Microsoft Entra. Beta privada con tres clientes en mayo." },
    ]}},
  { id: "f2", icon: "folder", type: "folder", name: "Proyecto Polígono", modified: "ayer", modifiedEn: "yesterday", size: "—", shared: ["DH","SC"], starred: false, encrypted: true },
  { id: "f3", icon: "img", type: "img", name: "IMG_4521.jpg", modified: "hace 3 horas", modifiedEn: "3h ago", size: "3.2 MB", shared: [], starred: false, encrypted: true },
  { id: "f4", icon: "doc", type: "doc", name: "Contrato-Servicios-2026.pdf", modified: "lun", modifiedEn: "Mon", size: "1.8 MB", shared: ["SC"], starred: true, encrypted: true,
    content: { title: "Contrato de Servicios 2026", body: [
      { type: "h2", text: "Cláusula primera — Objeto" },
      { type: "p", text: "El presente contrato tiene por objeto la prestación de servicios de hospedaje en nube privada, incluyendo cifrado de extremo a extremo, soporte técnico, y mantenimiento de la infraestructura." },
      { type: "h2", text: "Cláusula segunda — Vigencia" },
      { type: "p", text: "12 meses contados a partir del 1 de mayo de 2026, con renovación automática salvo notificación con 30 días de anticipación." },
    ]}},
  { id: "f5", icon: "video", type: "video", name: "demo-onboarding.mp4", modified: "vie", modifiedEn: "Fri", size: "84 MB", shared: [], starred: false, encrypted: true },
  { id: "f6", icon: "img", type: "img", name: "logo-pixqui-final.png", modified: "hace 1 semana", modifiedEn: "1 week ago", size: "412 KB", shared: ["MR","DH","SC"], starred: false, encrypted: true },
  { id: "f7", icon: "doc", type: "doc", name: "Plan-financiero-Q2.xlsx", modified: "hace 5 días", modifiedEn: "5d ago", size: "84 KB", shared: ["MR"], starred: false, encrypted: true },
  { id: "f8", icon: "music", type: "music", name: "presentación-musica.mp3", modified: "hace 2 semanas", modifiedEn: "2w ago", size: "8.4 MB", shared: [], starred: false, encrypted: false },
  { id: "f9", icon: "doc", type: "doc", name: "Notas-reunión-04-26.md", modified: "hoy", modifiedEn: "today", size: "12 KB", shared: ["MR","DH"], starred: false, encrypted: true,
    content: { title: "Notas — Reunión 26 abril", body: [
      { type: "h2", text: "Asistentes" },
      { type: "p", text: "Mariana Reyes, Diego Hernández, Sofía Cortés." },
      { type: "h2", text: "Acuerdos" },
      { type: "p", text: "Se aprueba el presupuesto Q2. Diego coordina la migración con el equipo legal. Sofía revisa los términos de servicio actualizados antes del viernes." },
    ]}},
];

const Dashboard = ({ t, lang, user, onLogout, onHome, showToast, initialFile }) => {
  const [activeNav, setActiveNav] = React.useState("files");
  const [activeTab, setActiveTab] = React.useState("all");
  const [view, setView] = React.useState("list");
  const [selected, setSelected] = React.useState(initialFile || null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const A = t.app;

  React.useEffect(() => {
    if (initialFile) setSelected(initialFile);
  }, [initialFile]);

  const filteredFiles = SAMPLE_FILES.filter(f => {
    if (activeTab === "starred") return f.starred;
    if (activeTab === "shared") return f.shared.length > 0;
    if (activeTab === "recent") return ["hace 2 min", "hoy", "hace 3 horas"].includes(f.modified);
    return true;
  });

  return (
    <div className="app-shell">
      {sidebarOpen && <div className="app-sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}
      <aside className={"app-sidebar" + (sidebarOpen ? " open" : "")}>
        <div className="brand" onClick={onHome} style={{ cursor: "pointer" }}>
          <span className="dotmark" style={{ width: 22, height: 22 }}></span>
          PixquiCloud
        </div>

        <div className="sb-section">{A.sbSections.files}</div>
        {[
          ["files", "files", A.sb.allFiles, ""],
          ["clock", "recent", A.sb.recent, ""],
          ["star", "favorites", A.sb.favorites, "2"],
          ["users", "shared", A.sb.shared, "12"],
          ["trash", "deleted", A.sb.deleted, ""],
        ].map(([ic, k, n, c]) => (
          <div key={k} className={"sb-item" + (activeNav === k ? " active" : "")} onClick={() => { setActiveNav(k); setSidebarOpen(false); }}>
            <Icon name={ic} size={15}/>{n}{c && <span className="count">{c}</span>}
          </div>
        ))}

        <div className="sb-section">{A.sbSections.apps}</div>
        {[
          ["photos", "photos", A.sb.photos],
          ["calendar", "calendar", A.sb.calendar],
          ["contacts", "contacts", A.sb.contacts],
          ["talk", "talk", A.sb.talk],
        ].map(([ic, k, n]) => (
          <div key={k} className={"sb-item" + (activeNav === k ? " active" : "")} onClick={() => { setActiveNav(k); setSidebarOpen(false); }}>
            <Icon name={ic} size={15}/>{n}
          </div>
        ))}

        <div className="sb-storage">
          <div className="label">{A.storage}</div>
          <div className="amount">42.3 GB</div>
          <div className="bar"><div className="bar-fill" style={{ width: "8.5%" }}></div></div>
          <div className="hint">8.5% {A.used} 500 GB</div>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 10, height: 30, fontSize: 11 }}>
            {A.upgrade}
          </button>
        </div>
      </aside>

      <main className="app-main">
        <div className="app-topbar">
          <button className="app-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <Icon name="menu" size={18}/>
          </button>
          <div className="app-search">
            <Icon name="search" size={14}/>
            <input placeholder={A.search} />
            <span className="kbd">⌘K</span>
          </div>
          <div className="tb-actions">
            <button className="tb-icon"><Icon name="upload" size={16}/></button>
            <button className="tb-icon"><Icon name="bell" size={16}/><span className="badge"></span></button>
            <button className="tb-icon"><Icon name="settings" size={16}/></button>
            <div className="tb-avatar" onClick={onLogout} title={user?.name || "Usuario"}>
              {(user?.name || "U").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase()}
            </div>
          </div>
        </div>

        <div className="app-content">
          {(activeNav === "files" || activeNav === "recent" || activeNav === "favorites" || activeNav === "shared") && (
            <>
              <div className="crumbs">
                <a href="#">{A.bcHome}</a>
                <span className="sep">/</span>
                <span className="current">{A.bcFiles}</span>
              </div>
              <h1 className="app-h1">{A.filesTitle}</h1>
              <div className="app-sub">{A.filesSub}, {user?.name?.split(" ")[0] || A.fallbackName} · {filteredFiles.length} {A.items}</div>

              <div className="app-toolbar">
                <div className="tb-tabs">
                  {[["all", A.tabs.all], ["recent", A.tabs.recent], ["shared", A.tabs.shared], ["starred", A.tabs.starred]].map(([k,n]) => (
                    <button key={k} className={activeTab === k ? "active" : ""} onClick={() => setActiveTab(k)}>{n}</button>
                  ))}
                </div>
                <button className="btn btn-primary btn-sm">{A.newBtn}</button>
                <button className="btn btn-ghost btn-sm">
                  <Icon name="upload" size={13}/>{A.uploadBtn}
                </button>
                <div className="view-toggle">
                  <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><Icon name="list" size={14}/></button>
                  <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Icon name="grid" size={14}/></button>
                </div>
              </div>

              {view === "list" ? (
                <div className="file-list">
                  <div className="fl-head">
                    <span></span>
                    <span>{A.cols.name}</span>
                    <span>{A.cols.modified}</span>
                    <span className="col-size">{A.cols.size}</span>
                    <span className="col-shared">{A.cols.shared}</span>
                    <span></span>
                  </div>
                  {filteredFiles.map(f => (
                    <div key={f.id} className="fl-row" onClick={() => {
                      if (f.type === "folder") return;
                      setSelected(f);
                      showToast(A.fileOpenedToast);
                    }}>
                      <div className="ficon-sm"><Icon name={f.icon} size={14}/></div>
                      <div className="name">
                        <span>{f.name}</span>
                        {f.encrypted && <span className="lock-pill"><Icon name="lock" size={8}/> E2EE</span>}
                        {f.starred && <Icon name="star" size={12} stroke={2} style={{ color: "var(--papel)", fill: "var(--papel)", flexShrink: 0 }}/>}
                      </div>
                      <div className="meta">{lang === "es" ? f.modified : f.modifiedEn}</div>
                      <div className="meta col-size">{f.size}</div>
                      <div className="shared col-shared">
                        {f.shared.map((s, i) => <span key={i} className="dot">{s}</span>)}
                      </div>
                      <div className="more"><Icon name="more" size={14}/></div>
                    </div>
                  ))}
                </div>
              ) : (
                <PhotoGridView files={filteredFiles} onPick={setSelected} />
              )}
            </>
          )}

          {activeNav === "photos" && (
            <PhotosView t={t} />
          )}
          {activeNav === "calendar" && <CalendarView t={t} />}
          {activeNav === "contacts" && <ContactsView t={t} />}
          {activeNav === "talk" && <TalkView t={t} />}
          {activeNav === "deleted" && (
            <EmptyView title={A.trashEmpty.title} sub={A.trashEmpty.sub} />
          )}
        </div>
      </main>

      {selected && <FilePreview file={selected} onClose={() => setSelected(null)} t={t} lang={lang} user={user} />}

    </div>
  );
};

const PhotoGridView = ({ files, onPick }) => (
  <div className="app-photogrid">
    {files.map((f, i) => (
      <div key={f.id} className="photo-tile" style={{ background: GRADIENTS[i % GRADIENTS.length] }} onClick={() => f.type !== "folder" && onPick(f)}>
        <div className="name">{f.name}</div>
      </div>
    ))}
  </div>
);

const PhotosView = ({ t }) => (
  <>
    <div className="crumbs"><span className="current">{t.app.sb.photos}</span></div>
    <h1 className="app-h1">{t.app.sb.photos}</h1>
    <div className="app-sub">{t.app.photos.sub}</div>
    <div className="app-photogrid" style={{ marginTop: 24 }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="photo-tile" style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
          <div className="name">IMG_{4500 + i}.jpg</div>
        </div>
      ))}
    </div>
  </>
);

const CalendarView = ({ t }) => {
  const cal = t.app.calendar;
  const days = cal.days;
  const events = cal.events;
  return (
    <>
      <div className="crumbs"><span className="current">{t.app.sb.calendar}</span></div>
      <h1 className="app-h1">{cal.title}</h1>
      <div className="app-sub">{cal.sub} · {events.length} {cal.eventsLabel}</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginTop: 24, fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", textAlign: "center", marginBottom: 8 }}>
        {days.map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
        {Array.from({length: 30}).map((_, i) => {
          const day = i + 1;
          const evs = events.filter(e => e.day === day);
          const isToday = day === 11;
          return (
            <div key={i} style={{
              minHeight: 80, padding: 10, borderRadius: 10,
              border: "1px solid var(--border)",
              background: isToday ? "rgba(132,183,157,0.08)" : "var(--bg-2)",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: isToday ? "var(--green)" : "var(--ink-2)" }}>{day}</div>
              {evs.map((e, j) => (
                <div key={j} style={{ fontSize: 10, padding: "3px 6px", background: e.color, color: "#062014", borderRadius: 4, fontWeight: 500 }}>{e.title}</div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

const ContactsView = ({ t }) => {
  const contacts = [
    ["MR", "Mariana Reyes", "mariana@poligono.mx", "+52 55 1234 5678"],
    ["DH", "Diego Hernández", "diego@hilo.mx", "+52 33 9876 5432"],
    ["SC", "Sofía Cortés", "sofia@cortes-legal.mx", "+52 81 2468 1357"],
    ["AT", "Antonio Torres", "antonio@bicimaps.org", "+52 55 1010 2020"],
    ["LM", "Lucía Méndez", "lucia@iberoamericana.edu", "+52 55 5555 1234"],
  ];
  return (
    <>
      <div className="crumbs"><span className="current">{t.app.sb.contacts}</span></div>
      <h1 className="app-h1">{t.app.sb.contacts}</h1>
      <div className="app-sub">{contacts.length} {t.app.contacts.sub}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, marginTop: 24 }}>
        {contacts.map(([i, n, e, p]) => (
          <div key={n} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-deep), var(--green))", display: "grid", placeItems: "center", fontWeight: 600, color: "#062014" }}>{i}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{n}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)" }}>{e}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)" }}>{p}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const TalkView = ({ t }) => {
  const chats = [
    ["MR", "Mariana Reyes", "ya subí el deck a la carpeta", "9:32", true],
    ["EQ", "Equipo Polígono", "Diego: revisé los contratos", "8:14", true],
    ["DH", "Diego Hernández", "📷 IMG_4521.jpg", "ayer", false],
    ["SC", "Sofía Cortés", "nos vemos jueves entonces", "ayer", false],
  ];
  return (
    <>
      <div className="crumbs"><span className="current">{t.app.sb.talk}</span></div>
      <h1 className="app-h1">{t.app.sb.talk}</h1>
      <div className="app-sub">{t.app.talk.sub}</div>
      <div style={{ marginTop: 24, background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        {chats.map(([i, n, m, ts, unread], idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: idx < chats.length - 1 ? "1px solid var(--border)" : 0, cursor: "pointer" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-deep), var(--green))", display: "grid", placeItems: "center", fontWeight: 600, color: "#062014", fontSize: 14 }}>{i}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 500, fontSize: 14 }}>{n}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)" }}>{ts}</span>
              </div>
              <div style={{ fontSize: 13, color: unread ? "var(--ink-2)" : "var(--mute)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m}</div>
            </div>
            {unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }}></div>}
          </div>
        ))}
      </div>
    </>
  );
};

const EmptyView = ({ title, sub }) => (
  <div style={{ display: "grid", placeItems: "center", padding: 80, textAlign: "center", color: "var(--mute)" }}>
    <div>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--panel)", display: "grid", placeItems: "center", margin: "0 auto 20px", color: "var(--mute)" }}>
        <Icon name="trash" size={28}/>
      </div>
      <div style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14 }}>{sub}</div>
    </div>
  </div>
);

const FilePreview = ({ file, onClose, t, lang, user }) => {
  const p = t.app.preview;
  const sharedName = (s) => s === "MR" ? "Mariana Reyes" : s === "DH" ? "Diego Hernández" : "Sofía Cortés";
  const firstName = (s) => sharedName(s).split(" ")[0];
  return (
    <div className="file-preview" onClick={onClose}>
      <div className="fp-main" onClick={e => e.stopPropagation()}>
        <button className="fp-close" onClick={onClose}><Icon name="x" size={18}/></button>
        {file.type === "doc" && file.content ? (
          <div className="fp-content">
            <h1>{file.content.title}</h1>
            <div className="doc-meta">{file.encrypted && <span style={{ color: "var(--green)" }}>🔒 E2EE · </span>} {file.size} · {lang === "es" ? file.modified : file.modifiedEn}</div>
            {file.content.body.map((b, i) => (
              b.type === "h2" ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>
            ))}
          </div>
        ) : file.type === "img" ? (
          <div style={{ width: "100%", maxWidth: 720, aspectRatio: "4/3", borderRadius: 12, background: "linear-gradient(135deg, #1e582e 0%, #84b79d 50%, #f3c969 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3), transparent 50%)" }}></div>
            <div style={{ position: "absolute", bottom: 20, left: 24, fontFamily: "var(--mono)", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{file.name}</div>
          </div>
        ) : file.type === "video" ? (
          <div style={{ width: "100%", maxWidth: 720, aspectRatio: "16/9", borderRadius: 12, background: "#000", display: "grid", placeItems: "center", position: "relative" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Icon name="video" size={28}/>
            </div>
          </div>
        ) : (
          <div className="fp-content"><h1>{file.name}</h1><p>{p.unavailable}</p></div>
        )}
      </div>
      <aside className="fp-side" onClick={e => e.stopPropagation()}>
        <div className="label">{p.details}</div>
        <h3>{file.name}</h3>
        <div style={{ marginTop: 16 }}>
          <div className="file-meta-row"><span className="k">{p.size}</span><span className="v">{file.size}</span></div>
          <div className="file-meta-row"><span className="k">{p.modified}</span><span className="v">{lang === "es" ? file.modified : file.modifiedEn}</span></div>
          <div className="file-meta-row"><span className="k">{p.type}</span><span className="v">{file.type}</span></div>
          <div className="file-meta-row"><span className="k">{p.encryption}</span><span className="v" style={{ color: "var(--green)" }}>{file.encrypted ? "E2EE AES-256" : "—"}</span></div>
        </div>

        <div className="fp-actions">
          <button className="primary"><Icon name="share" size={14}/> {p.shareLink}</button>
          <button><Icon name="download" size={14}/> {p.download}</button>
          <button><Icon name="star" size={14}/> {file.starred ? p.unstar : p.star}</button>
        </div>

        <div className="label">{p.sharedWith}</div>
        {file.shared.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {file.shared.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--panel)", borderRadius: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-deep), var(--green))", display: "grid", placeItems: "center", fontWeight: 600, color: "#062014", fontSize: 11 }}>{s}</div>
                <div>
                  <div style={{ fontSize: 12 }}>{sharedName(s)}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mute)" }}>Editor</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: "var(--mute)" }}>{p.onlyYou}</div>
        )}

        <div className="label">{p.activity}</div>
        <div className="activity-item">
          <div className="av">{(user?.name || "U").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase()}</div>
          <div>
            <div className="text"><b>{p.you}</b> {p.openedFile}</div>
            <div className="time">{p.now}</div>
          </div>
        </div>
        {file.shared[0] && (
          <div className="activity-item">
            <div className="av">{file.shared[0]}</div>
            <div>
              <div className="text"><b>{firstName(file.shared[0])}</b> {p.edited}</div>
              <div className="time">{p.hours2Ago}</div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export { Dashboard };
