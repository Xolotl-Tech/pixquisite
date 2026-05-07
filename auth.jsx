// Auth modal: signup multi-step + login

const AuthModal = ({ t, mode, setMode, onClose, onAuth }) => {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ name: "", email: "", password: "", workspace: "", region: "MX-Centro" });

  React.useEffect(() => { setStep(0); }, [mode]);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  if (mode === "login") {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="close" onClick={onClose}><Icon name="x" size={16}/></button>
          <h2>{t.auth.login}</h2>
          <p className="modal-sub">{t.auth.loginSub}</p>
          <label>{t.auth.email}</label>
          <input type="email" placeholder="tu@correo.mx" value={data.email} onChange={e => update("email", e.target.value)} />
          <label>{t.auth.password}</label>
          <input type="password" placeholder="••••••••" value={data.password} onChange={e => update("password", e.target.value)} />
          <button className="btn btn-primary btn-lg modal-cta" onClick={() => onAuth(data)}>{t.auth.enter}</button>
          <div className="switch-mode">
            {t.auth.switchToSignup} <button onClick={() => setMode("signup")}>{t.auth.signup}</button>
          </div>
        </div>
      </div>
    );
  }

  // Signup with steps
  const next = () => {
    if (step < 2) setStep(step + 1);
    else onAuth(data);
  };
  const back = () => step > 0 && setStep(step - 1);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}><Icon name="x" size={16}/></button>
        <div className="signup-step">
          {[0,1,2].map(i => <span key={i} className={i <= step ? "active" : ""} />)}
        </div>

        {step === 0 && (
          <>
            <h2>{t.auth.signup}</h2>
            <p className="modal-sub">{t.auth.signupSub}</p>
            <label>{t.auth.name}</label>
            <input placeholder="María González" value={data.name} onChange={e => update("name", e.target.value)} />
            <label>{t.auth.email}</label>
            <input type="email" placeholder="maria@ejemplo.mx" value={data.email} onChange={e => update("email", e.target.value)} />
            <label>{t.auth.password}</label>
            <input type="password" placeholder={t.auth.pwHint} value={data.password} onChange={e => update("password", e.target.value)} />
          </>
        )}
        {step === 1 && (
          <>
            <h2>{t.auth.step2Title}</h2>
            <p className="modal-sub">{t.auth.step2Sub}</p>
            <label>{t.auth.workspace}</label>
            <input placeholder="mi-nube" value={data.workspace || data.name.toLowerCase().replace(/\s/g, "-")} onChange={e => update("workspace", e.target.value)} />
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", marginTop: 4 }}>
              {(data.workspace || data.name.toLowerCase().replace(/\s/g, "-") || "tu-nube")}.pixqui.cloud
            </div>
            <label>{t.auth.region}</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
              {["MX-Centro", "MX-Norte", "MX-Sur", "Privado"].map(r => (
                <button key={r}
                  onClick={() => update("region", r)}
                  style={{
                    padding: "12px",
                    border: `1px solid ${data.region === r ? "var(--green)" : "var(--border-strong)"}`,
                    background: data.region === r ? "rgba(132,183,157,0.08)" : "var(--panel)",
                    borderRadius: 10,
                    color: data.region === r ? "var(--green)" : "var(--ink-2)",
                    fontFamily: "var(--mono)", fontSize: 12,
                    textAlign: "left",
                  }}>
                  <div>{r}</div>
                  <div style={{ fontSize: 10, color: "var(--mute)", marginTop: 2 }}>
                    {r === "MX-Centro" ? "Querétaro" : r === "MX-Norte" ? "Monterrey" : r === "MX-Sur" ? "Guadalajara" : "On-premise"}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <SetupAnimation t={t} onComplete={() => onAuth(data)} data={data} />
        )}

        {step < 2 && (
          <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
            {step > 0 && <button className="btn btn-ghost" style={{ flex: 1, textAlign: "center" }} onClick={back}>{t.auth.back}</button>}
            <button className="btn btn-primary" style={{ flex: 1, textAlign: "center" }} onClick={next}>{t.auth.next}</button>
          </div>
        )}
        {step === 0 && (
          <div className="switch-mode">
            {t.auth.switchToLogin} <button onClick={() => window.open("https://app.pixqui.cloud/", "_blank")}>{t.auth.enter}</button>
          </div>
        )}
      </div>
    </div>
  );
};

const SetupAnimation = ({ t, onComplete, data }) => {
  const [progress, setProgress] = React.useState(0);
  const steps = [
    "Generando llaves E2EE...",
    "Provisionando workspace...",
    "Cifrando almacenamiento...",
    "Conectando a " + data.region + "...",
    "¡Listo!",
  ];
  React.useEffect(() => {
    const id = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 30);
    return () => clearInterval(id);
  }, []);
  const stepIdx = Math.min(Math.floor(progress / 20), 4);

  return (
    <>
      <h2>{t.auth.step3Title}</h2>
      <p className="modal-sub">{t.auth.step3Sub}</p>
      <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginTop: 16, fontFamily: "var(--mono)", fontSize: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", color: i <= stepIdx ? "var(--green)" : "var(--mute-2)", opacity: i <= stepIdx ? 1 : 0.5 }}>
            {i < stepIdx ? <Icon name="check" size={14}/> : i === stepIdx ? (
              <span style={{ width: 14, height: 14, border: "2px solid var(--green)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }}></span>
            ) : <span style={{ width: 14, height: 14, border: "2px solid var(--mute-2)", borderRadius: "50%" }}></span>}
            {s}
          </div>
        ))}
        <div style={{ height: 4, background: "var(--border)", borderRadius: 4, marginTop: 16, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "var(--green)", transition: "width 0.1s" }}></div>
        </div>
      </div>
      <button className="btn btn-primary modal-cta" disabled={progress < 100} onClick={onComplete} style={{ marginTop: 28, opacity: progress < 100 ? 0.5 : 1, textAlign: "center" }}>
        {t.auth.finish}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

window.AuthModal = AuthModal;
