import { MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function DirectChat() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive
          className="!bg-chart-4"
          tooltip="Mensagens diretas"
        >
          <Link to="/chat" className="flex items-center gap-2">
            <MessageCircle />
            <span>Conversas</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
