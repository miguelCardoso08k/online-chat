import {
  EllipsisVertical,
  MessageCircleMore,
  SearchIcon,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const friends = [
  {
    id: 1,
    name: "José",
    status: "online",
    avatarUrl: null,
  },
  {
    id: 2,
    name: "Joséfa",
    status: "online",
    avatarUrl: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "Joséfinho  ",
    status: "offline",
    avatarUrl: null,
  },
];

function SearchFriends() {
  return (
    <div className="flex justify-center items-center gap-0">
      <Input className="w-full rounded-r-none " placeholder="Buscar" />
      <Button className=" bg-zinc-900 rounded-l-none">
        <SearchIcon />
      </Button>
    </div>
  );
}

export function OnlineFriends() {
  const filteredFriends = friends.filter((item) => item.status === "online");

  if (filteredFriends.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        <SearchFriends />
        <h1>Online - {filteredFriends.length}</h1>
        <Separator />
        <ScrollArea className="w-full">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="mt-2 flex flex-row justify-between items-center h-16 w-full p-5 rounded border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
            >
              <div className="flex justify-center items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      friend.avatarUrl
                        ? friend.avatarUrl
                        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                    }
                    alt={friend.name}
                  />
                  <AvatarFallback>{friend.name}</AvatarFallback>
                </Avatar>
                <div>
                  <span>{friend.name}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Tooltip>
                  <TooltipTrigger>
                    <MessageCircleMore />
                  </TooltipTrigger>
                  <TooltipContent>Conversar com {friend.name}</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width]  rounded-lg"
                    side="bottom"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <Trash />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    );
  } else {
    return <span>Nenhum amigo online</span>;
  }
}

export function Everyfriends() {
  if (friends.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        <SearchFriends />
        <h1>Amigos - {friends.length}</h1>
        <Separator />
        <ScrollArea className="w-full">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="mt-2 flex flex-row justify-between items-center h-16 w-full p-5 rounded border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
            >
              <div className="flex justify-center items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      friend.avatarUrl
                        ? friend.avatarUrl
                        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                    }
                    alt={friend.name}
                  />
                  <AvatarFallback>{friend.name}</AvatarFallback>
                </Avatar>
                <div>
                  <span>{friend.name}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Tooltip>
                  <TooltipTrigger>
                    <MessageCircleMore />
                  </TooltipTrigger>
                  <TooltipContent>Conversar com {friend.name}</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width]  rounded-lg"
                    side="bottom"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <Trash />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    );
  } else {
    return <span className="text-center">Você ainda não tem amigos</span>;
  }
}
