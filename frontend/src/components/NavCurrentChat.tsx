import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";

const chat = {
  id: "1",
  title: "Conversa Atual",
  isGroup: false,
};

export default function NavCurrentChat() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Conversa atual</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            tooltip={chat.title}
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                alt={chat.title}
              />
              <AvatarFallback className="rounded-lg">
                {chat.title}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{chat.title}</span>
            </div>
            <X className="ml-auto size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <Separator className="mt-4" />
    </SidebarGroup>
  );
}
