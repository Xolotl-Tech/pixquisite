// Byte AI section component
import React from "react";
import { Icon } from "./icons.jsx";

export const ByteSection = ({ t, lang, onSignup }) => {
  const b = t.byte;
  const [phase, setPhase] = React.useState("idle"); // idle | userIn | typing | respIn | done
  const [userMsg, setUserMsg] = React.useState(b.chatExample[0].text);
  const [pending, setPending] = React.useState("");
  const [respShown, setRespShown] = React.useState("");
  const [showActions, setShowActions] = React.useState(false);
  const [userVisible, setUserVisible] = React.useState(false);
  const exampleResponse = b.chatExample[1].text;
  const chatRef = React.useRef(null);
  const startedRef = React.useRef(false);

  // Trigger sequence on viewport entry. Captured once on mount; later lang changes
  // are intentional no-ops so the typewriter doesn't restart on every language toggle.
  const bRef = React.useRef(b);
  bRef.current = b;
  React.useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const cur = bRef.current;
          runSequence(cur.chatExample[0].text, cur.chatExample[1].text);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animation sequence: user msg fades in -> typing dots -> response typewriter -> actions
  const runSequence = (uMsg, rMsg) => {
    setUserMsg(uMsg);
    setUserVisible(false);
    setRespShown("");
    setShowActions(false);
    setPhase("idle");

    // 1. User message slides in
    setTimeout(() => {
      setUserVisible(true);
      setPhase("userIn");
    }, 400);

    // 2. Byte starts "typing"
    setTimeout(() => setPhase("typing"), 1400);

    // 3. Response begins typewriter
    setTimeout(() => {
      setPhase("respIn");
      let i = 0;
      const id = setInterval(() => {
        i++;
        setRespShown(rMsg.slice(0, i));
        if (i >= rMsg.length) {
          clearInterval(id);
          setTimeout(() => { setShowActions(true); setPhase("done"); }, 250);
        }
      }, 14);
    }, 3000);
  };

  const handleSend = () => {
    if (!pending.trim()) return;
    const msg = pending;
    setPending("");
    startedRef.current = true;
    runSequence(msg, exampleResponse);
  };

  return (
    <section id="byte" className="byte-section">
      <div className="container">
        <div className="byte-grid">
          <div>
            <div className="byte-tag"><span className="byte-orb"></span>{b.tag}</div>
            <h2 className="h-section">
              {b.title}<br/>
              <span className="accent">{b.titleAccent}</span>
            </h2>
            <p className="subtitle" style={{ marginTop: 24 }}>{b.sub}</p>

            <div className="byte-caps">
              {b.caps.map((c, i) => (
                <div key={i} className="byte-cap">
                  <div className="ci"><Icon name={c.icon} size={16}/></div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="byte-privacy-note">
              <div className="pn-label">★ {b.privacyTag}</div>
              <p>{b.privacy}</p>
              <div className="byte-privacy-pills">
                {b.pills.map((p, i) => <span key={i} className="pill"><Icon name="check" size={9}/>{p}</span>)}
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <button className="btn btn-primary btn-lg" onClick={onSignup}>
                {b.cta} <Icon name="arrow-right" size={16}/>
              </button>
            </div>
          </div>

          <div className="byte-chat" ref={chatRef}>
            <div className="byte-chat-head">
              <div className="byte-orb"></div>
              <div className="info">
                <h5>Byte</h5>
                <div className="status">{lang === "es" ? "Activo · en tu nube" : "Online · in your cloud"}</div>
              </div>
              <div className="ctx">
                Llama 3.3 · MX<br/>
                <span style={{ color: "var(--green)" }}>E2EE</span>
              </div>
            </div>

            <div className="byte-msgs">
              {userVisible && (
                <div className="byte-msg you bm-anim" key={"u-" + userMsg}>
                  <div className="av">{lang === "es" ? "TÚ" : "YOU"}</div>
                  <div className="bubble">{userMsg}</div>
                </div>
              )}

              {phase === "typing" && (
                <div className="byte-msg byte bm-anim">
                  <div className="av"></div>
                  <div className="bubble" style={{ display: "flex", gap: 4, padding: "12px 16px" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.4s ease-in-out infinite" }}></span>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.4s ease-in-out 0.2s infinite" }}></span>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.4s ease-in-out 0.4s infinite" }}></span>
                  </div>
                </div>
              )}

              {(phase === "respIn" || phase === "done") && (
                <div className="byte-msg byte bm-anim">
                  <div className="av"></div>
                  <div>
                    <div className="bubble">
                      {respShown}
                      {phase === "respIn" && <span style={{ display: "inline-block", width: 6, height: 13, marginLeft: 2, background: "var(--green)", animation: "byte-blink 1s step-end infinite", verticalAlign: "text-bottom" }}></span>}
                    </div>
                    {showActions && (
                      <div className="actions bm-anim">
                        <button>📅 {lang === "es" ? "Crear eventos" : "Create events"}</button>
                        <button>📋 {lang === "es" ? "Copiar resumen" : "Copy summary"}</button>
                        <button>↗ {lang === "es" ? "Ver llamada" : "View call"}</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="byte-input">
              <input
                placeholder={b.chatPlaceholder}
                value={pending}
                onChange={e => setPending(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
              />
              <button className="send-btn" onClick={handleSend}>
                <Icon name="arrow-right" size={14}/>
              </button>
            </div>
            <style>{`
              @keyframes bm-in {
                from { opacity: 0; transform: translateY(12px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .bm-anim { animation: bm-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
              @keyframes byte-blink { 0%,50% { opacity: 1; } 50.01%,100% { opacity: 0; } }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};
