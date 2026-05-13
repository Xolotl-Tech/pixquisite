import React from "react";
import { createRoot } from "react-dom/client";
import { ResultView } from "./resultView.jsx";
import "./fonts.js";
import "./styles.css";
import "./legal.css";

createRoot(document.getElementById("root")).render(<ResultView defaultKind="success" />);
