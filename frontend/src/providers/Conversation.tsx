import { Conversation } from "@/api/api";
import { ConversationContext } from "@/context/Conversation";
import { Conversation as ConversationType } from "@/schemas/conversation";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ReactNode } from "react";

export default function ConversationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const jwt = Cookies.get("token");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Conversations"],
    queryFn: async () => await Conversation.get(jwt!),
  });

  const conversations: ConversationType[] = data?.conversations ?? [];

  return (
    <ConversationContext.Provider value={{ conversations, isLoading, refetch }}>
      {children}
    </ConversationContext.Provider>
  );
}
