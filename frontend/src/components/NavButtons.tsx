import { Compass, Plus } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function NavButtons() {
  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton isActive tooltip="Criar conversa">
          <Plus />
          <span>Criar conversa</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton isActive tooltip="Explorar">
          <Compass />
          <span>Explorar</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
