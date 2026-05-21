# PixquiCloud

> Tu nube, tu control.

Sitio web institucional y demo interactiva de **PixquiCloud**, 
hospedada en México, con cifrado E2EE, software libre y soporte en español.

Este repositorio contiene el **frontend público**: landing comercial, modal de autenticación, demo del dashboard y páginas legales.

---

## Tabla de contenidos

- [Características](#características)
- [Stack técnico](#stack-técnico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo local](#desarrollo-local)
- [Internacionalización](#internacionalización)
- [Sesión demo](#sesión-demo)
- [Despliegue a producción](#despliegue-a-producción)
- [Consideraciones de seguridad](#consideraciones-de-seguridad)
- [Roadmap técnico](#roadmap-técnico)
- [Licencia](#licencia)

---

## Características

- **Landing comercial** con secciones de hero, features, pricing, testimonios y FAQ.
- **Demo del dashboard** sin necesidad de registro real (usuario simulado en `localStorage`).
- **Soporte multilenguaje** español / inglés (`window.I18N`).
- **Páginas legales** independientes (términos, privacidad, condiciones de uso).
- **Animaciones de scroll-reveal** con `IntersectionObserver`.
- **CSP estricta** definida en el `<head>` del HTML.

## Stack técnico

Sitio **estático**, sin paso de build. React se carga vía CDN y los archivos `.jsx` se transpilan en el navegador con Babel Standalone.

| Capa | Tecnología |
|---|---|
| UI | React 18.3.1 (UMD desde unpkg) |
| Transpilación | @babel/standalone 7.29 (en cliente) |
| Estilos | CSS plano modular (`styles.css`, `app.css`, `byte.css`, `legal.css`) |
| Tipografías | Google Fonts (Poppins, Inter, Inter Tight, JetBrains Mono) |
| Persistencia | `localStorage` (idioma y sesión demo) |
| Hosting | Cualquier servidor estático (ver [Despliegue](#despliegue-a-producción)) |

## Estructura del proyecto

```
.
├── index.html               # Entry point HTML
├── app.jsx                  # Componente raíz (router de vistas)
├── landing.jsx              # Hero, features, pricing, FAQ, footer
├── auth.jsx                 # Modal de login / signup
├── dashboard.jsx            # Demo del dashboard post-login
├── byte.jsx / byte.css      # Sección del asistente "Byte"
├── icons.jsx                # Componente <Icon />
├── i18n.js                  # Diccionario es / en (expone window.I18N)
├── styles.css               # Estilos globales y de landing
├── app.css                  # Estilos del dashboard
├── legal.css                # Estilos de páginas legales
├── terminos.html            # Términos de servicio
├── privacidad.html          # Aviso de privacidad
├── condiciones.html         # Condiciones de uso
├── assets/                  # Logos e imágenes de marca
├── screenshots/             # Capturas para la sección de preview
└── uploads/                 # Archivos de ejemplo del dashboard demo
```

## Desarrollo local

```bash
npm run dev
```

Para verificar el build de producción localmente:

```bash
npm run build
npm run preview
```

### Requisitos

- Cualquier navegador moderno (Chrome 90+, Firefox 90+, Safari 15+).
- Conexión a internet (los CDNs de React/Babel y Google Fonts cargan en runtime).

## Internacionalización

El idioma se guarda en `localStorage` bajo la clave `pxq_lang` (`"es"` | `"en"`). Para añadir un idioma, extiende el objeto `window.I18N` en [i18n.js](i18n.js) con la nueva clave de locale.

## Sesión demo

El flujo de autenticación está simulado: al "iniciar sesión" o usar la demo, se persiste un objeto de usuario en `localStorage` bajo `pxq_user` y se renderiza el dashboard.

Para limpiar el estado:

```js
localStorage.removeItem("pxq_user");
localStorage.removeItem("pxq_lang");
```

---

## Licencia

Propietario — © Xolotl Tech. Todos los derechos reservados salvo indicación en contrario en `assets/` o dependencias de terceros.
