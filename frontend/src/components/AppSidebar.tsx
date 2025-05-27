import DirectChat from "./NavDirectChat";
import NavServer from "./NavServer";
import NavUser from "./NavUser";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";

import NavCurrentChat from "./NavCurrentChat";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
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
    </Sidebar>
  );
}
