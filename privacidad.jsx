import React, { useState } from "react";
import { LegalLayout } from "./LegalLayout.jsx";
import "./styles.css";
import "./legal.css";

const LockSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const CheckSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const PrivacidadEs = () => (
  <>
    <div className="legal-callout">
      <div className="ic"><LockSvg /></div>
      <div className="text">
        <strong>Lo esencial en una línea</strong>
        Tus archivos están cifrados de extremo a extremo. No los leemos. No los entrenamos. No los vendemos. Punto.
      </div>
    </div>

    <h2 id="identidad"><span className="num">01</span>Identidad del responsable</h2>
    <p>El responsable del tratamiento de tus datos personales es <strong>PixquiCloud, S. de R.L. de C.V.</strong> ("PixquiCloud", "nosotros"), con domicilio fiscal en Ciudad de México, México, y RFC PIX260101A12. Este aviso de privacidad se rige por la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> y su Reglamento.</p>
    <p>Para cualquier asunto relacionado con tus datos puedes escribirnos a <a href="mailto:privacidad@pixqui.cloud">privacidad@pixqui.cloud</a> o consultar la sección <a href="#contacto">12. Contacto</a>.</p>

    <h2 id="datos"><span className="num">02</span>Datos que recopilamos</h2>
    <p>Recopilamos únicamente los datos estrictamente necesarios para que tu cuenta funcione. Los clasificamos en tres categorías:</p>
    <h3>2.1 Datos de cuenta</h3>
    <ul>
      <li><strong>Nombre y correo electrónico</strong> — para identificarte y comunicarnos contigo.</li>
      <li><strong>Contraseña</strong> — almacenada con hashing Argon2id; nunca la vemos en texto claro.</li>
      <li><strong>Nombre del espacio de trabajo y región preferida</strong> — para configurar tu nube.</li>
    </ul>
    <h3>2.2 Datos de uso técnico</h3>
    <ul>
      <li>Direcciones IP (anonimizadas a nivel de prefijo /24 cada 24 h).</li>
      <li>Agente de usuario y tipo de dispositivo, para diagnóstico de compatibilidad.</li>
      <li>Eventos agregados (inicios de sesión, errores), <strong>sin contenido</strong> de archivos.</li>
    </ul>
    <h3>2.3 Datos de facturación (solo planes de pago)</h3>
    <ul>
      <li>Razón social, RFC y dirección fiscal cuando solicitas factura CFDI.</li>
      <li>Últimos 4 dígitos de la tarjeta y método de pago, gestionados por nuestro procesador (Stripe). <strong>No almacenamos números de tarjeta completos</strong>.</li>
    </ul>

    <blockquote>
      <strong>Lo que NO recopilamos:</strong> el contenido de tus archivos, mensajes, contactos, fotos o cualquier dato dentro de tu nube. Esa información viaja cifrada y solo tú tienes la llave.
    </blockquote>

    <h2 id="finalidades"><span className="num">03</span>Finalidades del tratamiento</h2>
    <p>Tratamos tus datos personales para las siguientes finalidades primarias (necesarias para la prestación del servicio):</p>
    <ol>
      <li>Crear, mantener y autenticar tu cuenta.</li>
      <li>Proveer almacenamiento, sincronización y respaldo de tus archivos.</li>
      <li>Cobrar las suscripciones que contrates y emitir comprobantes fiscales.</li>
      <li>Brindar soporte técnico cuando lo solicites.</li>
      <li>Cumplir obligaciones legales y atender requerimientos de autoridad competente.</li>
    </ol>
    <p><strong>Finalidades secundarias</strong> (puedes oponerte sin afectar el servicio):</p>
    <ol>
      <li>Enviarte el boletín "PixquiNotas" con cambios de producto y consejos. <em>Opt-in al registrarte.</em></li>
      <li>Análisis estadístico agregado para mejorar la experiencia del producto.</li>
    </ol>

    <h2 id="cifrado"><span className="num">04</span>Cifrado y custodia</h2>
    <p>Todos los archivos se cifran <strong>en el cliente</strong> antes de salir de tu dispositivo, usando AES-256-GCM con llaves derivadas mediante PBKDF2-SHA512 a partir de tu contraseña maestra. Esto significa que:</p>
    <ul>
      <li>Ni PixquiCloud ni nuestro proveedor de infraestructura (KIO Networks, datacenter MEX-1 en Querétaro) pueden leer el contenido.</li>
      <li>Si pierdes tu contraseña maestra y no configuraste frase de recuperación, <strong>no podemos restaurar tus archivos</strong>. Es el costo real del cifrado E2E.</li>
      <li>Las llaves nunca se transmiten ni almacenan en nuestros servidores en texto claro.</li>
    </ul>
    <p>Para nombres de archivo y metadatos usamos cifrado convergente con sal por usuario, lo que nos permite mostrar la lista de archivos sin descifrar el contenido.</p>

    <h2 id="terceros"><span className="num">05</span>Terceros y subprocesadores</h2>
    <p>Compartimos datos con un número mínimo de proveedores, todos bajo contrato de procesamiento de datos:</p>
    <div className="legal-table-wrap">
      <table>
        <thead><tr><th>Proveedor</th><th>Función</th><th>Ubicación</th><th>Datos</th></tr></thead>
        <tbody>
          <tr><td>KIO Networks</td><td>Infraestructura</td><td>Querétaro, MX</td><td>Datos cifrados en reposo</td></tr>
          <tr><td>Stripe</td><td>Procesamiento de pagos</td><td>EE.UU. / MX</td><td>Datos de tarjeta y facturación</td></tr>
          <tr><td>Postmark</td><td>Correo transaccional</td><td>EE.UU.</td><td>Email y nombre</td></tr>
          <tr><td>Sentry</td><td>Reporte de errores</td><td>EE.UU.</td><td>Logs anonimizados</td></tr>
        </tbody>
      </table>
    </div>
    <p>La lista actualizada se publica en <a href="#">pixqui.cloud/subprocesadores</a> y notificamos cualquier cambio con 30 días de anticipación.</p>

    <h2 id="transferencias"><span className="num">06</span>Transferencias internacionales</h2>
    <p>Los datos sensibles permanecen en territorio mexicano. Las transferencias a terceros fuera de México (Stripe, Postmark, Sentry) se realizan únicamente al amparo de:</p>
    <ul>
      <li>Cláusulas Contractuales Tipo aprobadas por la autoridad europea (cuando aplica).</li>
      <li>El consentimiento que otorgas al aceptar este aviso.</li>
      <li>Salvaguardas técnicas como cifrado en tránsito (TLS 1.3) y en reposo.</li>
    </ul>

    <h2 id="derechos"><span className="num">07</span>Derechos ARCO</h2>
    <p>Tienes derecho a <strong>Acceder, Rectificar, Cancelar u Oponerte</strong> al tratamiento de tus datos personales, así como a revocar el consentimiento. Puedes ejercerlos:</p>
    <ol>
      <li>Desde Ajustes → Privacidad → "Mis datos" en cualquier momento (acción inmediata).</li>
      <li>Por correo a <a href="mailto:arco@pixqui.cloud">arco@pixqui.cloud</a> (respuesta máxima en 20 días hábiles).</li>
    </ol>
    <p>El ejercicio de estos derechos es <strong>gratuito</strong>, pero solo cobramos el costo razonable de envío si solicitas copias físicas.</p>

    <div className="legal-callout">
      <div className="ic"><CheckSvg /></div>
      <div className="text">
        <strong>Portabilidad inmediata</strong>
        Puedes exportar tu nube completa en formato estándar (ZIP + manifest JSON) en cualquier momento, sin pedir permiso, desde Ajustes → Exportar.
      </div>
    </div>

    <h2 id="retencion"><span className="num">08</span>Retención y eliminación</h2>
    <p>Conservamos tus datos solo el tiempo necesario:</p>
    <ul>
      <li><strong>Cuenta activa:</strong> mientras la mantengas abierta.</li>
      <li><strong>Cuenta cancelada:</strong> 30 días en papelera para que puedas reactivarla; después borrado criptográfico de las llaves (los blobs cifrados se vuelven inaccesibles para siempre).</li>
      <li><strong>Datos de facturación:</strong> 5 años por obligaciones fiscales (CFF Art. 30).</li>
      <li><strong>Logs técnicos:</strong> 90 días, después se agregan estadísticamente.</li>
    </ul>

    <h2 id="cookies"><span className="num">09</span>Cookies y tecnologías similares</h2>
    <p>Usamos cookies estrictamente necesarias para mantener tu sesión iniciada (<code>pxq_session</code>) y recordar tu preferencia de idioma (<code>pxq_lang</code>). <strong>No usamos cookies de publicidad ni de seguimiento de terceros.</strong> No tenemos pixeles de Meta, Google ni TikTok.</p>

    <h2 id="menores"><span className="num">10</span>Menores de edad</h2>
    <p>El servicio no está dirigido a menores de 13 años. Para usuarios entre 13 y 17 años se requiere consentimiento del padre, madre o tutor, quien puede ejercer derechos ARCO en su representación.</p>

    <h2 id="cambios"><span className="num">11</span>Cambios al aviso</h2>
    <p>Si hacemos cambios sustanciales a este aviso, te notificaremos por correo y mediante un aviso destacado en el dashboard al menos <strong>30 días antes</strong> de su entrada en vigor. Los cambios menores (correcciones tipográficas, aclaraciones) se publican aquí con la fecha de actualización.</p>
    <p>El historial completo de versiones está disponible en <a href="#">pixqui.cloud/legal/historial</a>.</p>

    <h2 id="contacto"><span className="num">12</span>Contacto y autoridad</h2>
    <p>Si tienes dudas, sugerencias o quieres reportar un incidente:</p>
    <ul>
      <li>Correo: <a href="mailto:privacidad@pixqui.cloud">privacidad@pixqui.cloud</a></li>
      <li>Encargado de privacidad: Mariana Sánchez Téllez (DPO)</li>
      <li>Dirección postal: Av. Insurgentes Sur 1602, Of. 410, Crédito Constructor, 03940 Ciudad de México</li>
    </ul>
    <p>Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir al <strong>Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)</strong> en <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer">inai.org.mx</a>.</p>
  </>
);

const PrivacidadEn = () => (
  <>
    <div className="legal-callout">
      <div className="ic"><LockSvg /></div>
      <div className="text">
        <strong>The essentials in one line</strong>
        Your files are end-to-end encrypted. We don't read them. We don't train on them. We don't sell them. Period.
      </div>
    </div>

    <h2 id="identidad"><span className="num">01</span>Data controller identity</h2>
    <p>The data controller responsible for processing your personal data is <strong>PixquiCloud, S. de R.L. de C.V.</strong> ("PixquiCloud", "we"), with registered address in Mexico City, Mexico, and tax ID PIX260101A12. This privacy notice is governed by the <strong>Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP)</strong> and its Regulations.</p>
    <p>For any matter related to your data, you can write to <a href="mailto:privacidad@pixqui.cloud">privacidad@pixqui.cloud</a> or see section <a href="#contacto">12. Contact</a>.</p>

    <h2 id="datos"><span className="num">02</span>Data we collect</h2>
    <p>We collect only the data strictly necessary for your account to work. We classify it into three categories:</p>
    <h3>2.1 Account data</h3>
    <ul>
      <li><strong>Name and email address</strong> — to identify you and communicate with you.</li>
      <li><strong>Password</strong> — stored with Argon2id hashing; we never see it in plain text.</li>
      <li><strong>Workspace name and preferred region</strong> — to configure your cloud.</li>
    </ul>
    <h3>2.2 Technical usage data</h3>
    <ul>
      <li>IP addresses (anonymized to /24 prefix level every 24 h).</li>
      <li>User agent and device type, for compatibility diagnostics.</li>
      <li>Aggregate events (logins, errors), <strong>without file content</strong>.</li>
    </ul>
    <h3>2.3 Billing data (paid plans only)</h3>
    <ul>
      <li>Business name, tax ID and billing address when you request a tax receipt.</li>
      <li>Last 4 digits of card and payment method, managed by our processor (Stripe). <strong>We do not store full card numbers</strong>.</li>
    </ul>

    <blockquote>
      <strong>What we do NOT collect:</strong> the content of your files, messages, contacts, photos, or any data inside your cloud. That information travels encrypted and only you hold the key.
    </blockquote>

    <h2 id="finalidades"><span className="num">03</span>Processing purposes</h2>
    <p>We process your personal data for the following primary purposes (necessary for providing the service):</p>
    <ol>
      <li>Create, maintain, and authenticate your account.</li>
      <li>Provide storage, synchronization, and backup of your files.</li>
      <li>Charge for subscriptions you take out and issue tax receipts.</li>
      <li>Provide technical support when you request it.</li>
      <li>Comply with legal obligations and respond to requests from competent authorities.</li>
    </ol>
    <p><strong>Secondary purposes</strong> (you can object without affecting the service):</p>
    <ol>
      <li>Sending you the "PixquiNotes" newsletter with product updates and tips. <em>Opt-in at registration.</em></li>
      <li>Aggregate statistical analysis to improve the product experience.</li>
    </ol>

    <h2 id="cifrado"><span className="num">04</span>Encryption and custody</h2>
    <p>All files are encrypted <strong>on the client</strong> before leaving your device, using AES-256-GCM with keys derived via PBKDF2-SHA512 from your master password. This means:</p>
    <ul>
      <li>Neither PixquiCloud nor our infrastructure provider (KIO Networks, datacenter MEX-1 in Querétaro) can read the content.</li>
      <li>If you lose your master password and didn't set up a recovery phrase, <strong>we cannot restore your files</strong>. That's the real cost of E2E encryption.</li>
      <li>Keys are never transmitted or stored on our servers in plain text.</li>
    </ul>
    <p>For file names and metadata we use convergent encryption with per-user salt, which allows us to show the file list without decrypting the content.</p>

    <h2 id="terceros"><span className="num">05</span>Third parties and sub-processors</h2>
    <p>We share data with a minimum number of providers, all under a data processing agreement:</p>
    <div className="legal-table-wrap">
      <table>
        <thead><tr><th>Provider</th><th>Function</th><th>Location</th><th>Data</th></tr></thead>
        <tbody>
          <tr><td>KIO Networks</td><td>Infrastructure</td><td>Querétaro, MX</td><td>Encrypted data at rest</td></tr>
          <tr><td>Stripe</td><td>Payment processing</td><td>USA / MX</td><td>Card and billing data</td></tr>
          <tr><td>Postmark</td><td>Transactional email</td><td>USA</td><td>Email and name</td></tr>
          <tr><td>Sentry</td><td>Error reporting</td><td>USA</td><td>Anonymized logs</td></tr>
        </tbody>
      </table>
    </div>
    <p>The updated list is published at <a href="#">pixqui.cloud/subprocesadores</a> and we notify any changes 30 days in advance.</p>

    <h2 id="transferencias"><span className="num">06</span>International transfers</h2>
    <p>Sensitive data remains in Mexican territory. Transfers to third parties outside Mexico (Stripe, Postmark, Sentry) are made only under:</p>
    <ul>
      <li>Standard Contractual Clauses approved by European authorities (where applicable).</li>
      <li>The consent you grant by accepting this notice.</li>
      <li>Technical safeguards such as encryption in transit (TLS 1.3) and at rest.</li>
    </ul>

    <h2 id="derechos"><span className="num">07</span>Your rights</h2>
    <p>You have the right to <strong>Access, Rectify, Cancel or Object</strong> to the processing of your personal data, as well as to revoke consent. You can exercise them:</p>
    <ol>
      <li>From Settings → Privacy → "My data" at any time (immediate action).</li>
      <li>By email to <a href="mailto:arco@pixqui.cloud">arco@pixqui.cloud</a> (maximum response within 20 business days).</li>
    </ol>
    <p>Exercising these rights is <strong>free of charge</strong>, though we charge only reasonable shipping costs if you request physical copies.</p>

    <div className="legal-callout">
      <div className="ic"><CheckSvg /></div>
      <div className="text">
        <strong>Instant portability</strong>
        You can export your entire cloud in a standard format (ZIP + JSON manifest) at any time, without asking permission, from Settings → Export.
      </div>
    </div>

    <h2 id="retencion"><span className="num">08</span>Retention and deletion</h2>
    <p>We keep your data only as long as necessary:</p>
    <ul>
      <li><strong>Active account:</strong> while you keep it open.</li>
      <li><strong>Cancelled account:</strong> 30 days in the trash so you can reactivate; then cryptographic deletion of keys (encrypted blobs become permanently inaccessible).</li>
      <li><strong>Billing data:</strong> 5 years due to tax obligations (CFF Art. 30).</li>
      <li><strong>Technical logs:</strong> 90 days, then statistically aggregated.</li>
    </ul>

    <h2 id="cookies"><span className="num">09</span>Cookies and similar technologies</h2>
    <p>We use strictly necessary cookies to keep your session active (<code>pxq_session</code>) and remember your language preference (<code>pxq_lang</code>). <strong>We do not use advertising or third-party tracking cookies.</strong> We have no Meta, Google, or TikTok pixels.</p>

    <h2 id="menores"><span className="num">10</span>Minors</h2>
    <p>The service is not directed at children under 13. For users between 13 and 17, parental or guardian consent is required; they may exercise data rights on the user's behalf.</p>

    <h2 id="cambios"><span className="num">11</span>Changes to this notice</h2>
    <p>If we make substantial changes to this notice, we will notify you by email and via a prominent alert in the dashboard at least <strong>30 days before</strong> they take effect. Minor changes (typographic corrections, clarifications) are published here with the update date.</p>
    <p>The full version history is available at <a href="#">pixqui.cloud/legal/historial</a>.</p>

    <h2 id="contacto"><span className="num">12</span>Contact and authority</h2>
    <p>If you have questions, suggestions, or want to report an incident:</p>
    <ul>
      <li>Email: <a href="mailto:privacidad@pixqui.cloud">privacidad@pixqui.cloud</a></li>
      <li>Privacy Officer: Mariana Sánchez Téllez (DPO)</li>
      <li>Postal address: Av. Insurgentes Sur 1602, Of. 410, Crédito Constructor, 03940 Mexico City</li>
    </ul>
    <p>If you believe your right to data protection has been violated, you may contact the <strong>National Institute for Transparency, Access to Information and Personal Data Protection (INAI)</strong> at <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer">inai.org.mx</a>.</p>
  </>
);

export const PrivacidadPage = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("pxq_lang") || "es");
  return (
    <LegalLayout lang={lang} setLang={setLang} page="privacidad">
      {lang === "es" ? <PrivacidadEs /> : <PrivacidadEn />}
    </LegalLayout>
  );
};

