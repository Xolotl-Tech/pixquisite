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
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        privacidad: resolve(__dirname, "privacidad.html"),
        terminos: resolve(__dirname, "terminos.html"),
        condiciones: resolve(__dirname, "condiciones.html"),
      },
    },
  },
});
