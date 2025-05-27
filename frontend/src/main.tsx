import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthLayoutProvider } from "./providers/Auth.tsx";
import MainLayoutProvider from "./providers/Main.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./providers/User.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthLayoutProvider>
          <UserProvider>
            <MainLayoutProvider>
              <App />
            </MainLayoutProvider>
          </UserProvider>
        </AuthLayoutProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
