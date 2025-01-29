import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./route/Home.tsx";
import React from "react";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
