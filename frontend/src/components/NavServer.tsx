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

const servers = [
  {
    id: 1,
    title: "Meu grupo",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 2,
    title: "Meu grupo 1",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 3,
    title: "Meu grupo 2",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 4,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 5,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 6,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 7,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 8,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 9,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 0,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 11,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  {
    id: 12,
    title: "Meu grupo 3",
    imageUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
];

const getItems = () => {
  const items = [];

  for (let i = 0; i < 3; i++) {
    items.push(servers[i]);
  }

  return items;
};

const items = getItems();

export default function NavServer() {
  const { open, openMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Servidores</SidebarGroupLabel>
      <SidebarMenu className="gap-3">
        {open || openMobile ? (
          <ScrollArea className="h-44">
            {servers.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={item.imageUrl} alt={item.title} />
                    <AvatarFallback className="rounded-lg">
                      {item.title}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </ScrollArea>
        ) : (
          <>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  tooltip={item.title}
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={item.imageUrl} alt={item.title} />
                    <AvatarFallback className="rounded-lg">
                      {item.title}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </>
        )}
        <NavButtons />
      </SidebarMenu>
    </SidebarGroup>
  );
}
