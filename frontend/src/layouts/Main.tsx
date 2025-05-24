import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ConversationProvider from "@/providers/Conversation";
import Cookies from "js-cookie";
import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router";

export default function MainLayout() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/signin", { replace: true });
    }
    if (token) {
      navigate("/chat", { replace: true });
    }
  });

  return (
    token && (
      <ConversationProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <main className="bg-zinc-800 h-full">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ConversationProvider>
    )
  );
}
