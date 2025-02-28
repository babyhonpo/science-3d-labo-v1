import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router"
import React from "react"
import StarBackground from "./components/StarBackground.tsx"



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StarBackground />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

