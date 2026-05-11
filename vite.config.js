import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
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
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        privacidad: resolve(__dirname, "privacidad.html"),
        terminos: resolve(__dirname, "terminos.html"),
        condiciones: resolve(__dirname, "condiciones.html"),
        success: resolve(__dirname, "success.html"),
        pending: resolve(__dirname, "pending.html"),
        failure: resolve(__dirname, "failure.html"),
        cancelar: resolve(__dirname, "cancelar.html"),
      },
    },
  },
});
