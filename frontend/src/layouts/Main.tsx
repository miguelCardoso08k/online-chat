import { User } from "@/api/api";
import AlertLogout from "@/components/AlertLogout";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUserContext } from "@/hooks/useContext";
import { getSocket } from "@/lib/socket";
import AlertLogoutProvider from "@/providers/AlertLogout";
import ConversationProvider from "@/providers/Conversation";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router";

export default function MainLayout() {
  const { setUser, user } = useUserContext();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => User.get(token!),
    enabled: !user,
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/signin", { replace: true });
    }

    if (data) {
      setUser(data.user);
    }
  });

  if (token) {
    const socket = getSocket();
    socket.connect();
  }

  return (
    token && (
      <ConversationProvider>
        <AlertLogoutProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main className="flex-1 min-h-0 bg-zinc-800">
                <Outlet />
                <AlertLogout />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AlertLogoutProvider>
      </ConversationProvider>
    )
  );
}
