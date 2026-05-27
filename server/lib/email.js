import nodemailer from "nodemailer";

// Email transporter — uses environment variables for SMTP config.
// In production, set EMAIL_FROM, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS.
// For testing, leave EMAIL_FROM blank and check console.error() for captured messages.
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const from = process.env.EMAIL_FROM;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!from || !host || !user || !pass) {
    console.warn(
      "[email] Missing SMTP config (EMAIL_FROM, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS). " +
      "Emails will be logged to console instead."
    );
    // Return a mock transporter that logs to console for development
    return {
      sendMail: async (opts) => {
        console.log("[email] (dev mode - not sent)", JSON.stringify(opts, null, 2));
        return { messageId: "dev-mock-" + Date.now() };
      },
    };
  }

  transporter = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
};

// Send free plan registration email to user
export const sendFreeAccountEmail = async (name, email) => {
  const transport = getTransporter();
  try {
    await transport.sendMail({
      from: process.env.EMAIL_FROM || "PixquiCloud <noreply@pixqui.cloud>",
      to: email,
      subject: "Tu cuenta PixquiCloud está siendo creada — 12-24 hrs",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #84b79d;">¡Bienvenido a PixquiCloud!</h1>
              <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
              <p>Tu registro al plan <strong>Gratis</strong> ha sido recibido exitosamente.</p>
              <p>Estamos preparando tu nube cifrada. Tu cuenta será creada en los próximos <strong>12 a 24 horas</strong>.</p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Detalles de tu registro:</h3>
                <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
                <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
                <p><strong>Plan:</strong> Gratis (5 GB)</p>
              </div>
              <p>Cuando tu cuenta esté lista, recibirás otro correo con tus credenciales de acceso.</p>
              <p>Si tienes preguntas, escríbenos a <strong>hi@pixqui.cloud</strong>.</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #999;">
                PixquiCloud · Tu nube, tus reglas.<br>
                Hecho en México con software libre.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Hola ${name},

Tu registro al plan Gratis ha sido recibido exitosamente.

Estamos preparando tu nube cifrada. Tu cuenta será creada en los próximos 12 a 24 horas.

Detalles de tu registro:
- Nombre: ${name}
- Correo: ${email}
- Plan: Gratis (5 GB)

Cuando tu cuenta esté lista, recibirás otro correo con tus credenciales de acceso.

Si tienes preguntas, escríbenos a hi@pixqui.cloud

---
PixquiCloud · Tu nube, tus reglas.
Hecho en México con software libre.
      `,
    });
    console.log(`[email] Free account confirmation sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`[email] Failed to send free account email to ${email}:`, err);
    throw err;
  }
};

// Send admin notification of new free signup
export const sendAdminFreeSignupNotification = async (name, email) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM;
  if (!adminEmail) {
    console.warn("[email] ADMIN_EMAIL not configured, skipping admin notification");
    return;
  }

  const transport = getTransporter();
  try {
    await transport.sendMail({
      from: process.env.EMAIL_FROM || "PixquiCloud <noreply@pixqui.cloud>",
      to: adminEmail,
      subject: `[ADMIN] Nuevo registro Gratis: ${name}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Nuevo registro — Plan Gratis</h2>
              <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
              <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
              <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
              <p><strong>Acción requerida:</strong> Crear cuenta dentro de 12-24 horas</p>
            </div>
          </body>
        </html>
      `,
      text: `
Nuevo registro — Plan Gratis

Nombre: ${name}
Correo: ${email}
Fecha: ${new Date().toISOString()}

Acción requerida: Crear cuenta dentro de 12-24 horas
      `,
    });
    console.log(`[email] Admin notification sent to ${adminEmail}`);
    return true;
  } catch (err) {
    console.error(`[email] Failed to send admin notification:`, err);
    // Don't throw — admin email failure shouldn't block user registration
  }
};

// Utility: escape HTML to prevent injection
const escapeHtml = (text) => {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
