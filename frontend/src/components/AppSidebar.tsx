import { Link } from "react-router";
import DirectChat from "./NavDirectChat";
import NavServer from "./NavServer";
import NavUser from "./NavUser";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import { Search } from "lucide-react";
import NavCurrentChat from "./NavCurrentChat";

// const items =[
//   {
//     title: "Chats",
//     url:"/chat",
//     icon: MessageCircle
//   },

// ]

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive tooltip="Pesquisar">
              <Link to="/">
                <Search />
                <span>Pesquisar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <DirectChat />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <NavCurrentChat />
        <NavServer />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
