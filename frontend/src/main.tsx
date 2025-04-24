import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthLayoutProvider } from "./providers/Auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthLayoutProvider>
        <App />
      </AuthLayoutProvider>
    </BrowserRouter>
  </StrictMode>
);
