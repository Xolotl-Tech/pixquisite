import React, { useState } from "react";
import { LegalLayout } from "./LegalLayout.jsx";
import "./styles.css";
import "./legal.css";

const FileSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const TerminosEs = () => (
  <>
    <div className="legal-callout">
      <div className="ic"><FileSvg /></div>
      <div className="text">
        <strong>Resumen humano</strong>
        Tus archivos siguen siendo tuyos. Pagas por almacenamiento, no por tus datos. Puedes cancelar cuando quieras y exportar todo. No abusamos del lenguaje legal.
      </div>
    </div>

    <h2 id="aceptacion"><span className="num">01</span>Aceptación del contrato</h2>
    <p>Al crear una cuenta o usar el servicio aceptas estos términos. Si no estás de acuerdo, no uses el servicio. Si usas PixquiCloud en nombre de una organización, declaras tener facultades para obligarla.</p>
    <p>Estos términos forman, junto con la <a href="/privacidad">Política de Privacidad</a> y las <a href="/condiciones">Condiciones de Uso</a>, el acuerdo completo entre tú y nosotros.</p>

    <h2 id="cuenta"><span className="num">02</span>Tu cuenta</h2>
    <p>Para usar el servicio necesitas crear una cuenta con un correo válido y una contraseña fuerte. Te comprometes a:</p>
    <ul>
      <li>Proporcionar información veraz y mantenerla actualizada.</li>
      <li>Mantener la confidencialidad de tu contraseña maestra.</li>
      <li>Notificarnos inmediatamente cualquier uso no autorizado en <a href="mailto:seguridad@pixqui.cloud">seguridad@pixqui.cloud</a>.</li>
      <li>No compartir tu cuenta con terceros (las cuentas son personales e intransferibles).</li>
    </ul>
    <p>Eres responsable de toda actividad que ocurra bajo tu cuenta.</p>

    <h2 id="contenido"><span className="num">03</span>Contenido del usuario</h2>
    <p><strong>Tu contenido es tuyo.</strong> No reclamamos propiedad sobre los archivos, fotos, mensajes o cualquier dato que subas. Solo nos otorgas una licencia <em>limitada, no exclusiva y revocable</em> para almacenar, transmitir y mostrar ese contenido <strong>únicamente para prestarte el servicio</strong>. Esta licencia termina cuando eliminas el contenido o cancelas la cuenta.</p>
    <p>Por la naturaleza del cifrado de extremo a extremo, no podemos ver tu contenido. Confías en ti mismo para no subir material que viole la ley mexicana.</p>

    <h2 id="planes"><span className="num">04</span>Planes y pagos</h2>
    <p>Ofrecemos un plan gratuito con 5 GB y planes de pago con más almacenamiento y funciones. Los precios se publican en <a href="/#pricing">pixqui.cloud/precios</a> e incluyen IVA cuando aplica.</p>
    <ul>
      <li><strong>Facturación:</strong> mensual o anual, por adelantado.</li>
      <li><strong>Renovación automática</strong> salvo que canceles con al menos 24 h de anticipación.</li>
      <li><strong>Comprobantes fiscales (CFDI):</strong> disponibles en Ajustes → Facturación dentro de los primeros 30 días de cada cargo.</li>
      <li><strong>Cambios de precio:</strong> se notifican con 60 días de anticipación; aplican en tu siguiente ciclo.</li>
    </ul>

    <h2 id="cancelacion"><span className="num">05</span>Cancelación y reembolsos</h2>
    <p>Puedes cancelar en cualquier momento desde Ajustes → Suscripción. La cancelación surte efecto al final del período pagado.</p>
    <p><strong>Política de reembolso:</strong> dentro de los primeros 14 días de tu primera suscripción anual, devolvemos el 100%. Las renovaciones no son reembolsables, pero conservas el acceso hasta el fin del período.</p>

    <h2 id="disponibilidad"><span className="num">06</span>Disponibilidad y SLA</h2>
    <p>Nos esforzamos por mantener el servicio 24/7, pero no garantizamos disponibilidad ininterrumpida. Los planes Pro y Business incluyen un SLA de <strong>99.9% mensual</strong>; si caemos por debajo, acreditamos en tu siguiente ciclo:</p>
    <div className="legal-table-wrap">
      <table>
        <thead><tr><th>Disponibilidad</th><th>Crédito</th></tr></thead>
        <tbody>
          <tr><td>&lt; 99.9%</td><td>10% del mes</td></tr>
          <tr><td>&lt; 99.0%</td><td>25% del mes</td></tr>
          <tr><td>&lt; 95.0%</td><td>50% del mes</td></tr>
        </tbody>
      </table>
    </div>
    <p>El estado en tiempo real está en <a href="#">status.pixqui.cloud</a>.</p>

    <h2 id="limites"><span className="num">07</span>Limitaciones de uso</h2>
    <p>Te comprometes a no usar el servicio para:</p>
    <ul>
      <li>Almacenar o distribuir contenido ilegal según la legislación mexicana.</li>
      <li>Material que constituya pornografía infantil (cualquier reporte se atiende vía NCMEC).</li>
      <li>Distribuir malware o realizar ataques contra terceros.</li>
      <li>Eludir las cuotas técnicas, hacer scraping masivo o abusar de la API.</li>
      <li>Revender el servicio sin un acuerdo de partner firmado.</li>
    </ul>
    <p>Las violaciones graves pueden resultar en suspensión inmediata sin reembolso.</p>

    <h2 id="propiedad"><span className="num">08</span>Propiedad intelectual</h2>
    <p>El software, marca, diseño y demás materiales de PixquiCloud son propiedad nuestra o de nuestros licenciantes. El núcleo del servidor está basado en Nextcloud y otros proyectos de software libre, cuyas licencias respetamos y citamos en <a href="#">pixqui.cloud/oss</a>.</p>
    <p>Se te otorga una licencia personal, no transferible y no exclusiva para usar el cliente y la interfaz mientras tu cuenta esté activa.</p>

    <h2 id="responsabilidad"><span className="num">09</span>Limitación de responsabilidad</h2>
    <p>El servicio se provee "tal cual" y "según disponibilidad". En la medida máxima permitida por la ley:</p>
    <ul>
      <li>No somos responsables por pérdida de datos derivada del olvido de tu contraseña maestra cuando no configuraste frase de recuperación.</li>
      <li>No respondemos por daños indirectos, incidentales o lucro cesante.</li>
      <li>Nuestra responsabilidad total se limita al monto que hayas pagado en los 12 meses previos al evento.</li>
    </ul>
    <p>Nada en estos términos limita responsabilidades que la ley mexicana no permita excluir (dolo, lesiones personales, etc.).</p>

    <h2 id="terminacion"><span className="num">10</span>Terminación</h2>
    <p>Puedes cerrar tu cuenta cuando quieras desde Ajustes → Cerrar cuenta. Nosotros podemos suspender o cerrar cuentas que violen estos términos, dando un aviso razonable salvo en casos graves (actividad ilegal, riesgo a terceros).</p>
    <p>Tras la terminación, dispones de 30 días para exportar tus datos. Después se aplican los plazos de eliminación descritos en la <a href="/privacidad#retencion">Política de Privacidad</a>.</p>

    <h2 id="legislacion"><span className="num">11</span>Legislación aplicable</h2>
    <p>Este contrato se rige por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
    <p>Si eres consumidor con domicilio en otra jurisdicción, conservas las protecciones imperativas de tu legislación local.</p>

    <h2 id="cambios"><span className="num">12</span>Cambios a los términos</h2>
    <p>Podemos actualizar estos términos. Los cambios materiales se notifican con 30 días de anticipación por correo y aviso destacado en el dashboard. Si no estás de acuerdo, puedes cancelar antes de que entren en vigor.</p>
    <p>El historial completo de versiones se publica en <a href="#">pixqui.cloud/legal/historial</a>.</p>
  </>
);

const TerminosEn = () => (
  <>
    <div className="legal-callout">
      <div className="ic"><FileSvg /></div>
      <div className="text">
        <strong>Plain English summary</strong>
        Your files remain yours. You pay for storage, not for your data. Cancel anytime and export everything. We don't abuse legal language.
      </div>
    </div>

    <h2 id="aceptacion"><span className="num">01</span>Contract acceptance</h2>
    <p>By creating an account or using the service you accept these terms. If you disagree, do not use the service. If you use PixquiCloud on behalf of an organization, you declare that you have authority to bind it.</p>
    <p>These terms form, together with the <a href="/privacidad">Privacy Policy</a> and the <a href="/condiciones">Usage Policy</a>, the complete agreement between you and us.</p>

    <h2 id="cuenta"><span className="num">02</span>Your account</h2>
    <p>To use the service you need to create an account with a valid email and a strong password. You agree to:</p>
    <ul>
      <li>Provide accurate information and keep it up to date.</li>
      <li>Keep your master password confidential.</li>
      <li>Notify us immediately of any unauthorized use at <a href="mailto:seguridad@pixqui.cloud">seguridad@pixqui.cloud</a>.</li>
      <li>Not share your account with third parties (accounts are personal and non-transferable).</li>
    </ul>
    <p>You are responsible for all activity that occurs under your account.</p>

    <h2 id="contenido"><span className="num">03</span>User content</h2>
    <p><strong>Your content is yours.</strong> We claim no ownership over the files, photos, messages, or any data you upload. You only grant us a <em>limited, non-exclusive, revocable</em> license to store, transmit, and display that content <strong>solely to provide you the service</strong>. This license ends when you delete the content or cancel your account.</p>
    <p>Due to the nature of end-to-end encryption, we cannot see your content. You trust yourself not to upload material that violates Mexican law.</p>

    <h2 id="planes"><span className="num">04</span>Plans and payments</h2>
    <p>We offer a free plan with 5 GB and paid plans with more storage and features. Prices are published at <a href="/#pricing">pixqui.cloud/precios</a> and include VAT where applicable.</p>
    <ul>
      <li><strong>Billing:</strong> monthly or annual, in advance.</li>
      <li><strong>Automatic renewal</strong> unless you cancel at least 24 h in advance.</li>
      <li><strong>Tax receipts (CFDI):</strong> available in Settings → Billing within the first 30 days of each charge.</li>
      <li><strong>Price changes:</strong> notified 60 days in advance; apply on your next billing cycle.</li>
    </ul>

    <h2 id="cancelacion"><span className="num">05</span>Cancellation and refunds</h2>
    <p>You can cancel at any time from Settings → Subscription. Cancellation takes effect at the end of the paid period.</p>
    <p><strong>Refund policy:</strong> within the first 14 days of your first annual subscription, we refund 100%. Renewals are non-refundable, but you retain access until the end of the period.</p>

    <h2 id="disponibilidad"><span className="num">06</span>Availability and SLA</h2>
    <p>We strive to keep the service running 24/7, but we do not guarantee uninterrupted availability. Pro and Business plans include a <strong>99.9% monthly SLA</strong>; if we fall below that, we credit your next cycle:</p>
    <div className="legal-table-wrap">
      <table>
        <thead><tr><th>Availability</th><th>Credit</th></tr></thead>
        <tbody>
          <tr><td>&lt; 99.9%</td><td>10% of the month</td></tr>
          <tr><td>&lt; 99.0%</td><td>25% of the month</td></tr>
          <tr><td>&lt; 95.0%</td><td>50% of the month</td></tr>
        </tbody>
      </table>
    </div>
    <p>Real-time status is at <a href="#">status.pixqui.cloud</a>.</p>

    <h2 id="limites"><span className="num">07</span>Usage limits</h2>
    <p>You agree not to use the service to:</p>
    <ul>
      <li>Store or distribute content illegal under Mexican law.</li>
      <li>Material constituting child pornography (any report is handled via NCMEC).</li>
      <li>Distribute malware or carry out attacks against third parties.</li>
      <li>Circumvent technical quotas, mass-scrape, or abuse the API.</li>
      <li>Resell the service without a signed partner agreement.</li>
    </ul>
    <p>Serious violations may result in immediate suspension without refund.</p>

    <h2 id="propiedad"><span className="num">08</span>Intellectual property</h2>
    <p>The software, brand, design, and other PixquiCloud materials are our property or that of our licensors. The server core is based on Nextcloud and other open-source projects, whose licenses we respect and cite at <a href="#">pixqui.cloud/oss</a>.</p>
    <p>You are granted a personal, non-transferable, non-exclusive license to use the client and interface while your account is active.</p>

    <h2 id="responsabilidad"><span className="num">09</span>Limitation of liability</h2>
    <p>The service is provided "as is" and "as available". To the maximum extent permitted by law:</p>
    <ul>
      <li>We are not liable for data loss resulting from forgetting your master password when you didn't set up a recovery phrase.</li>
      <li>We are not liable for indirect, incidental damages or lost profits.</li>
      <li>Our total liability is limited to the amount you paid in the 12 months prior to the event.</li>
    </ul>
    <p>Nothing in these terms limits liabilities that Mexican law does not permit to exclude (fraud, personal injury, etc.).</p>

    <h2 id="terminacion"><span className="num">10</span>Termination</h2>
    <p>You can close your account at any time from Settings → Close account. We may suspend or close accounts that violate these terms, giving reasonable notice except in serious cases (illegal activity, risk to third parties).</p>
    <p>After termination, you have 30 days to export your data. Thereafter the deletion timelines described in the <a href="/privacidad#retencion">Privacy Policy</a> apply.</p>

    <h2 id="legislacion"><span className="num">11</span>Governing law</h2>
    <p>This agreement is governed by the laws of the United Mexican States. For any dispute, the parties submit to the competent courts of Mexico City, waiving any other jurisdiction that may apply.</p>
    <p>If you are a consumer domiciled in another jurisdiction, you retain the mandatory protections of your local law.</p>

    <h2 id="cambios"><span className="num">12</span>Changes to terms</h2>
    <p>We may update these terms. Material changes are notified 30 days in advance by email and prominent dashboard alert. If you disagree, you may cancel before they take effect.</p>
    <p>The full version history is published at <a href="#">pixqui.cloud/legal/historial</a>.</p>
  </>
);

export const TerminosPage = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("pxq_lang") || "es");
  return (
    <LegalLayout lang={lang} setLang={setLang} page="terminos">
      {lang === "es" ? <TerminosEs /> : <TerminosEn />}
    </LegalLayout>
  );
};

