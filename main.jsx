import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./app.jsx";
import { PrivacidadPage } from "./privacidad.jsx";
import { TerminosPage } from "./terminos.jsx";
import { CondicionesPage } from "./condiciones.jsx";
import { ResultView } from "./resultView.jsx";
import { CancelPage } from "./cancelar.jsx";
import "./fonts.js";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="/condiciones" element={<CondicionesPage />} />
        <Route path="/success" element={<ResultView defaultKind="success" />} />
        <Route path="/pending" element={<ResultView defaultKind="pending" />} />
        <Route path="/failure" element={<ResultView defaultKind="failure" />} />
        <Route path="/cancelar" element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);
