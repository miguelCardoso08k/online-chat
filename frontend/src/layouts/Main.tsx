import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ConversationProvider from "@/providers/Conversation";

import { Outlet } from "react-router";

export default function MainLayout() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/chat", { replace: true });
  // }, [navigate]);
  return (
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
  );
}
