import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// SPA fallback: rewrite navigation requests for clean routes to /index.html.
// Runs before Vite's transform middleware so it intercepts HTML navigations
// before the dev server tries to resolve /terminos → terminos.jsx, etc.
// Skips requests that already have a file extension (module/asset requests).
const spaFallback = {
  name: "spa-fallback",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (
        req.method === "GET" &&
        req.headers.accept?.includes("text/html") &&
        !req.url.startsWith("/api/") &&
        !req.url.startsWith("/@") &&
        !req.url.includes(".")
      ) {
        req.url = "/index.html";
      }
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      if (
        req.method === "GET" &&
        req.headers.accept?.includes("text/html") &&
        !req.url.startsWith("/api/") &&
        !req.url.includes(".")
      ) {
        req.url = "/index.html";
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), spaFallback],
  esbuild: {
    loader: "jsx",
    include: /\.(jsx|js)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
