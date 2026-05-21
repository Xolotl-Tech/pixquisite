import React, { useState } from "react";
import { LegalLayout } from "./LegalLayout.jsx";
import "./styles.css";
import "./legal.css";

const CheckCircleSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);
const InfoSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const CondicionesEs = () => (
  <>
    <div className="legal-callout">
      <div className="ic"><CheckCircleSvg /></div>
      <div className="text">
        <strong>Tres reglas básicas</strong>
        Sé honesto. No dañes a terceros. No uses la nube como infraestructura para actividades ilegales. El resto está permitido.
      </div>
    </div>

    <h2 id="alcance"><span className="num">01</span>Alcance</h2>
    <p>Estas condiciones aplican a toda persona que acceda al servicio, sea usuario registrado, invitado a un archivo compartido, participante de una reunión Talk o consumidor de la API. Al continuar usando el servicio aceptas estas reglas.</p>

    <h2 id="cuotas"><span className="num">02</span>Cuotas técnicas</h2>
    <div className="legal-table-wrap">
      <table>
        <thead><tr><th>Recurso</th><th>Free</th><th>Pro</th><th>Business</th></tr></thead>
        <tbody>
          <tr><td>Almacenamiento</td><td>5 GB</td><td>500 GB</td><td>2 TB / usuario</td></tr>
          <tr><td>Tamaño máx. archivo</td><td>2 GB</td><td>50 GB</td><td>200 GB</td></tr>
          <tr><td>API requests / hora</td><td>1,000</td><td>10,000</td><td>100,000</td></tr>
          <tr><td>Compartidos activos</td><td>20</td><td>200</td><td>Sin límite</td></tr>
          <tr><td>Talk: participantes</td><td>4</td><td>25</td><td>100</td></tr>
        </tbody>
      </table>
    </div>
    <p>Los excedentes de tráfico se cobran a 0.50 MXN por GB después del límite mensual. Te avisamos al alcanzar el 80%.</p>

    <h2 id="aceptable"><span className="num">03</span>Uso aceptable</h2>
    <p>Está expresamente permitido:</p>
    <ul>
      <li>Almacenar archivos personales o de tu organización (documentos, fotos, video, código, copias de seguridad).</li>
      <li>Compartir archivos con familiares, colegas o clientes mediante enlaces protegidos.</li>
      <li>Usar el cliente de escritorio para sincronizar entre tus dispositivos.</li>
      <li>Conectar herramientas de terceros vía WebDAV o nuestra API (respetando las cuotas).</li>
      <li>Hospedar páginas estáticas pequeñas en tu dominio personal vía Sites.</li>
    </ul>

    <h2 id="prohibido"><span className="num">04</span>Uso prohibido</h2>
    <p>Está prohibido usar PixquiCloud para:</p>
    <ul>
      <li><strong>Material de explotación infantil</strong> (CSAM). Reportamos a NCMEC y a la FGR.</li>
      <li>Distribuir <strong>malware, ransomware, spyware</strong> o herramientas de ataque.</li>
      <li>Ejecutar <strong>minería de criptomonedas</strong> en nuestros servidores o vía nuestras conexiones.</li>
      <li><strong>Phishing</strong> o suplantación de marcas, incluida PixquiCloud.</li>
      <li>Hospedar <strong>contenido pirata</strong> de gran escala (catálogos completos de software o medios).</li>
      <li><strong>Spam</strong> o envío masivo no solicitado a través de Talk o correo.</li>
      <li>Eludir nuestras cuotas técnicas mediante cuentas múltiples coordinadas.</li>
      <li>Operar servicios que dependan de la API sin un plan Business o partner.</li>
      <li>Cualquier actividad que viole leyes mexicanas, incluyendo pero no limitado a: tráfico de personas, armas, drogas, delitos financieros.</li>
    </ul>

    <h2 id="compartir"><span className="num">05</span>Archivos compartidos</h2>
    <p>Cuando compartes un archivo o carpeta:</p>
    <ul>
      <li>Eres responsable del contenido y de las personas a quienes lo compartas.</li>
      <li>Puedes revocar el acceso en cualquier momento desde el panel de Compartidos.</li>
      <li>Los enlaces públicos pueden caducar automáticamente (recomendado).</li>
      <li>El receptor del enlace acepta estas mismas condiciones al acceder.</li>
      <li>No nos responsabilizamos del uso que terceros den al material que tú decides compartir.</li>
    </ul>

    <h2 id="api"><span className="num">06</span>Uso de API y bots</h2>
    <p>Nuestra API es libre dentro de las cuotas. Reglas operativas:</p>
    <ul>
      <li>Identifica tu cliente con un <code>User-Agent</code> reconocible.</li>
      <li>Implementa <em>backoff</em> exponencial al recibir <code>429 Too Many Requests</code>.</li>
      <li>No hagas <em>polling</em> agresivo; usa webhooks o WebSocket cuando estén disponibles.</li>
      <li>Para casos de uso de alto volumen, contáctanos para un plan dedicado.</li>
    </ul>

    <h2 id="byte"><span className="num">07</span>Byte AI</h2>
    <p>Byte es nuestro asistente integrado a Talk y al gestor de archivos. Reglas específicas:</p>
    <ul>
      <li>Byte se ejecuta en nuestros propios servidores en México sobre modelos Llama 3.3 / Mistral.</li>
      <li><strong>Tus conversaciones con Byte no se usan para entrenar modelos.</strong></li>
      <li>Byte ve solo el contenido que le pidas explícitamente analizar (un archivo seleccionado, una transcripción de reunión).</li>
      <li>El plan Free tiene 50 mensajes/mes; Pro y Business tienen uso ilimitado dentro de fair use.</li>
      <li>No uses Byte para generar contenido ilegal, dañino o engañoso.</li>
    </ul>

    <h2 id="talk"><span className="num">08</span>Talk y reuniones</h2>
    <p>Talk ofrece llamadas de voz, video y chat cifrados E2E:</p>
    <ul>
      <li>Las grabaciones requieren consentimiento explícito de todos los participantes (la app lo solicita automáticamente).</li>
      <li>El anfitrión es responsable de moderar la sala.</li>
      <li>Se prohíbe el acoso, discurso de odio o exposición de menores en salas públicas.</li>
      <li>Las llamadas se borran del servidor 7 días después de finalizadas (o de inmediato si activas "no almacenar").</li>
    </ul>

    <h2 id="abuso"><span className="num">09</span>Reporte de abuso</h2>
    <p>Si encuentras contenido que viole estas condiciones puedes reportarlo:</p>
    <ul>
      <li>Desde el menú "..." de cualquier archivo o sala compartida → "Reportar abuso".</li>
      <li>Por correo a <a href="mailto:abuso@pixqui.cloud">abuso@pixqui.cloud</a> con la URL y descripción.</li>
      <li>Para emergencias (CSAM, riesgo inminente): <a href="mailto:emergencia@pixqui.cloud">emergencia@pixqui.cloud</a>, atendemos en menos de 4 h.</li>
    </ul>
    <p>Las solicitudes de autoridad mexicana siguen el proceso descrito en nuestra <a href="#">Política de Solicitudes Legales</a>.</p>

    <h2 id="sancion"><span className="num">10</span>Sanciones</h2>
    <p>Aplicamos sanciones graduales:</p>
    <ol>
      <li><strong>Advertencia:</strong> primer incumplimiento menor; te notificamos por correo.</li>
      <li><strong>Restricción temporal:</strong> bloqueo de funciones específicas (compartir, API, etc.) por 7 a 30 días.</li>
      <li><strong>Suspensión:</strong> cuenta deshabilitada con período de 30 días para exportar.</li>
      <li><strong>Terminación:</strong> reservada para violaciones graves (contenido ilegal, malware, fraude); aplicamos eliminación inmediata y reportamos a la autoridad cuando proceda.</li>
    </ol>

    <h2 id="apelacion"><span className="num">11</span>Apelaciones</h2>
    <p>Si crees que una sanción se aplicó por error, puedes apelar respondiendo al correo de notificación o escribiendo a <a href="mailto:apelaciones@pixqui.cloud">apelaciones@pixqui.cloud</a> dentro de 30 días. Un equipo distinto al que aplicó la sanción revisará el caso y responderá en máximo 10 días hábiles.</p>

    <div className="legal-callout">
      <div className="ic"><InfoSvg /></div>
      <div className="text">
        <strong>Sentido común antes que reglas</strong>
        Estas condiciones son una guía. No podemos prever cada situación. En la duda, decidimos a favor del usuario y la privacidad.
      </div>
    </div>
  </>
);

const CondicionesEn = () => (
  <>
    <div className="legal-callout">
      <div className="ic"><CheckCircleSvg /></div>
      <div className="text">
        <strong>Three basic rules</strong>
        Be honest. Don't harm others. Don't use the cloud as infrastructure for illegal activities. Everything else is allowed.
      </div>
    </div>

    <h2 id="alcance"><span className="num">01</span>Scope</h2>
    <p>These conditions apply to every person who accesses the service, whether a registered user, guest invited to a shared file, Talk meeting participant, or API consumer. By continuing to use the service you accept these rules.</p>

    <h2 id="cuotas"><span className="num">02</span>Technical quotas</h2>
    <div className="legal-table-wrap">
      <table>
        <thead><tr><th>Resource</th><th>Free</th><th>Pro</th><th>Business</th></tr></thead>
        <tbody>
          <tr><td>Storage</td><td>5 GB</td><td>500 GB</td><td>2 TB / user</td></tr>
          <tr><td>Max. file size</td><td>2 GB</td><td>50 GB</td><td>200 GB</td></tr>
          <tr><td>API requests / hour</td><td>1,000</td><td>10,000</td><td>100,000</td></tr>
          <tr><td>Active shares</td><td>20</td><td>200</td><td>Unlimited</td></tr>
          <tr><td>Talk: participants</td><td>4</td><td>25</td><td>100</td></tr>
        </tbody>
      </table>
    </div>
    <p>Traffic overages are charged at MXN 0.50 per GB after the monthly limit. We notify you when you reach 80%.</p>

    <h2 id="aceptable"><span className="num">03</span>Acceptable use</h2>
    <p>Expressly permitted:</p>
    <ul>
      <li>Storing personal or organizational files (documents, photos, video, code, backups).</li>
      <li>Sharing files with family, colleagues, or clients via protected links.</li>
      <li>Using the desktop client to sync across your devices.</li>
      <li>Connecting third-party tools via WebDAV or our API (within quotas).</li>
      <li>Hosting small static pages on your personal domain via Sites.</li>
    </ul>

    <h2 id="prohibido"><span className="num">04</span>Prohibited use</h2>
    <p>It is prohibited to use PixquiCloud to:</p>
    <ul>
      <li><strong>Child sexual abuse material</strong> (CSAM). We report to NCMEC and FGR.</li>
      <li>Distribute <strong>malware, ransomware, spyware</strong> or attack tools.</li>
      <li>Run <strong>cryptocurrency mining</strong> on our servers or via our connections.</li>
      <li><strong>Phishing</strong> or brand impersonation, including PixquiCloud.</li>
      <li>Host <strong>large-scale pirated content</strong> (complete software or media catalogs).</li>
      <li><strong>Spam</strong> or unsolicited bulk messaging via Talk or email.</li>
      <li>Circumvent our technical quotas through coordinated multiple accounts.</li>
      <li>Operate services that depend on the API without a Business plan or partner agreement.</li>
      <li>Any activity that violates Mexican law, including but not limited to: human trafficking, weapons, drugs, financial crimes.</li>
    </ul>

    <h2 id="compartir"><span className="num">05</span>Shared files</h2>
    <p>When you share a file or folder:</p>
    <ul>
      <li>You are responsible for the content and the people you share it with.</li>
      <li>You can revoke access at any time from the Shares panel.</li>
      <li>Public links can expire automatically (recommended).</li>
      <li>The link recipient accepts these same conditions upon access.</li>
      <li>We are not responsible for how third parties use material that you choose to share.</li>
    </ul>

    <h2 id="api"><span className="num">06</span>API and bot usage</h2>
    <p>Our API is free within quotas. Operational rules:</p>
    <ul>
      <li>Identify your client with a recognizable <code>User-Agent</code>.</li>
      <li>Implement exponential <em>backoff</em> when receiving <code>429 Too Many Requests</code>.</li>
      <li>Don't aggressively poll; use webhooks or WebSocket when available.</li>
      <li>For high-volume use cases, contact us for a dedicated plan.</li>
    </ul>

    <h2 id="byte"><span className="num">07</span>Byte AI</h2>
    <p>Byte is our assistant integrated into Talk and the file manager. Specific rules:</p>
    <ul>
      <li>Byte runs on our own servers in Mexico using Llama 3.3 / Mistral models.</li>
      <li><strong>Your conversations with Byte are not used to train models.</strong></li>
      <li>Byte only sees content you explicitly ask it to analyze (a selected file, a meeting transcript).</li>
      <li>The Free plan has 50 messages/month; Pro and Business have unlimited use within fair use.</li>
      <li>Do not use Byte to generate illegal, harmful, or deceptive content.</li>
    </ul>

    <h2 id="talk"><span className="num">08</span>Talk and meetings</h2>
    <p>Talk offers E2E-encrypted voice, video, and chat calls:</p>
    <ul>
      <li>Recordings require explicit consent from all participants (the app requests this automatically).</li>
      <li>The host is responsible for moderating the room.</li>
      <li>Harassment, hate speech, or exposure of minors in public rooms is prohibited.</li>
      <li>Calls are deleted from the server 7 days after they end (or immediately if you enable "don't store").</li>
    </ul>

    <h2 id="abuso"><span className="num">09</span>Abuse reporting</h2>
    <p>If you find content that violates these conditions, you can report it:</p>
    <ul>
      <li>From the "..." menu of any shared file or room → "Report abuse".</li>
      <li>By email to <a href="mailto:abuso@pixqui.cloud">abuso@pixqui.cloud</a> with the URL and description.</li>
      <li>For emergencies (CSAM, imminent risk): <a href="mailto:emergencia@pixqui.cloud">emergencia@pixqui.cloud</a>, we respond within 4 hours.</li>
    </ul>
    <p>Requests from Mexican authorities follow the process described in our <a href="#">Legal Requests Policy</a>.</p>

    <h2 id="sancion"><span className="num">10</span>Sanctions</h2>
    <p>We apply graduated sanctions:</p>
    <ol>
      <li><strong>Warning:</strong> first minor violation; we notify you by email.</li>
      <li><strong>Temporary restriction:</strong> blocking of specific features (sharing, API, etc.) for 7 to 30 days.</li>
      <li><strong>Suspension:</strong> account disabled with a 30-day period to export data.</li>
      <li><strong>Termination:</strong> reserved for serious violations (illegal content, malware, fraud); we apply immediate deletion and report to authorities when appropriate.</li>
    </ol>

    <h2 id="apelacion"><span className="num">11</span>Appeals</h2>
    <p>If you believe a sanction was applied in error, you may appeal by replying to the notification email or writing to <a href="mailto:apelaciones@pixqui.cloud">apelaciones@pixqui.cloud</a> within 30 days. A team different from the one that applied the sanction will review the case and respond within 10 business days.</p>

    <div className="legal-callout">
      <div className="ic"><InfoSvg /></div>
      <div className="text">
        <strong>Common sense before rules</strong>
        These conditions are a guide. We can't anticipate every situation. When in doubt, we decide in favor of the user and privacy.
      </div>
    </div>
  </>
);

export const CondicionesPage = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("pxq_lang") || "es");
  return (
    <LegalLayout lang={lang} setLang={setLang} page="condiciones">
      {lang === "es" ? <CondicionesEs /> : <CondicionesEn />}
    </LegalLayout>
  );
};

