# Deploy — PixquiCloud

Setup-once + redeploy guide for the Ubuntu server running aaPanel + Nextcloud + Cloudflare.

## One-time setup

### 1. Clone the repo

SSH into the server and clone into the vhost path:

```bash
cd /www/wwwroot
git clone https://github.com/Xolotl-Tech/pixquisite.git pixqui
cd pixqui
```

### 2. Configure server `.env`

```bash
cp server/.env.example server/.env
nano server/.env
```

Fill in:

```
MP_ACCESS_TOKEN=APP_USR-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...        # see step 6
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_FAMILIA=price_...
PUBLIC_BASE_URL=https://pixqui.cloud
PORT=3000
NODE_ENV=production
```

### 3. First build

```bash
./deploy.sh
```

This installs frontend deps, builds `dist/`, and installs server deps.

### 4. aaPanel — frontend vhost

1. Website → `pixqui.cloud` (or create it).
2. Site Directory → set **Document Root** to `/www/wwwroot/pixqui/dist`.
3. SSL → Let's Encrypt → enable + force HTTPS.
4. **Reverse Proxy → Add**:
   - Name: `api`
   - Source URL: `/api/`
   - Target URL: `http://127.0.0.1:3000`
   - Save.

### 5. aaPanel — Node app

1. App Store → install **Node.js Version Manager** if missing.
2. Node Project Manager → **Add Project**:
   - Project path: `/www/wwwroot/pixqui/server`
   - Startup file: `index.js`
   - Project port: `3000`
   - Auto start: ✓
3. **Start**.

### 6. Stripe webhook

1. Stripe dashboard → Developers → Webhooks → **Add endpoint**.
2. URL: `https://pixqui.cloud/api/webhooks/stripe`
3. Events: `checkout.session.completed` (add more later as needed).
4. Copy the **Signing secret** (`whsec_...`) and paste it into `server/.env` as `STRIPE_WEBHOOK_SECRET`.
5. aaPanel Node Manager → Restart the project.

### 7. Cloudflare — disable body-modifying features

For the Stripe webhook signature to validate, the request body cannot be altered:

- Speed → Optimization → **Rocket Loader: OFF**
- Speed → Optimization → **Auto Minify (JS/HTML): OFF**

(You can scope these to everything except `/api/*` via Page Rules if you want minify for the static frontend.)

### 8. Sanity checks

- `https://pixqui.cloud/api/health` → returns `{"ok":true}`
- `https://pixqui.cloud` → landing renders
- Pricing → Pro → fill form → Stripe Checkout → pay with `4242 4242 4242 4242` → lands on `/success.html`
- Stripe dashboard → Webhooks → event delivered with status 200

## Redeploy (after pushing changes to main)

SSH to the server:

```bash
cd /www/wwwroot/pixqui
./deploy.sh
```

Then aaPanel → Node Project Manager → **Restart** the `pixqui-api` project.

That's it.

## Troubleshooting

- **`{"ok":true}` no responde**: el Node app no está corriendo. aaPanel → Node Manager → check logs.
- **Webhook signature error en logs**: Cloudflare Rocket Loader / Auto Minify están activos, o `STRIPE_WEBHOOK_SECRET` no coincide con el del dashboard.
- **CORS error en el browser**: `PUBLIC_BASE_URL` en `.env` no coincide con el dominio real.
- **El pago se completa pero la cuenta no existe en `app.pixqui.cloud`**: esto es esperado por ahora. La provisión automática del usuario llega en un PR posterior. De momento, créala manualmente en el admin de Nextcloud.
