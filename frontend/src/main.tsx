import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthLayoutProvider } from "./providers/Auth.tsx";
import MainLayoutProvider from "./providers/Main.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthLayoutProvider>
        <MainLayoutProvider>
          <App />
        </MainLayoutProvider>
      </AuthLayoutProvider>
    </BrowserRouter>
  </StrictMode>
);
