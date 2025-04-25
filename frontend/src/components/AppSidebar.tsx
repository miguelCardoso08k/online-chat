import DirectChat from "./DirectChat";
import NavUser from "./NavUser";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";

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
      <SidebarContent className="bg-zinc-900">
        <SidebarHeader>
          <DirectChat />
        </SidebarHeader>
        <Separator />
        <SidebarGroup>
          
        </SidebarGroup>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </SidebarContent>
    </Sidebar>
  );
}
