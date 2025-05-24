import { useConversationContext } from "@/hooks/useContext";
import NavButtons from "./NavButtons";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Conversation } from "@/schemas/conversation";
import { defaultAvatarUrl } from "@/lib/utils";
import { Link } from "react-router";

export default function NavServer() {
  const { conversations } = useConversationContext();
  const groups = conversations?.filter(
    (conversation) => conversation.isGroup === true
  );

  const minGroups: Conversation[] = [];

  if (groups) {
    for (let i = 0; i < 3; i++) {
      if (i == groups.length) break;
      minGroups.push(groups[i]);
    }
  }

  const { open, openMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Grupos</SidebarGroupLabel>
      <SidebarMenu className="gap-3">
        {open || openMobile ? (
          <ScrollArea className="h-44">
            {groups?.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link to={`chat/${item.id}`}>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={item.imageUrl ? item.imageUrl : defaultAvatarUrl}
                        alt={item.title ?? item.id}
                      />
                      <AvatarFallback className="rounded-lg">
                        {item.title}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </ScrollArea>
        ) : (
          <>
            {minGroups.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link to={`chat/${item.id}`}>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    tooltip={item.title ?? item.id}
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={item.imageUrl ?? defaultAvatarUrl}
                        alt={item.title ?? item.id}
                      />
                      <AvatarFallback className="rounded-lg">
                        {item.title ?? item.id}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {item.title ?? item.id}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </>
        )}
        <NavButtons />
      </SidebarMenu>
    </SidebarGroup>
  );
}
