import { Conversation } from "@/api/conversation";
import { ConversationContext } from "@/context/Conversation";
import { Conversation as ConversationType } from "@/schemas/conversation";
import { useQuery } from "@tanstack/react-query";

import { ReactNode } from "react";

export default function ConversationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Conversations"],
    queryFn: async () => await Conversation.get(),
  });
  

  const conversations: ConversationType[] = data?.conversations ?? [];

  return (
    <ConversationContext.Provider value={{ conversations, isLoading, refetch }}>
      {children}
    </ConversationContext.Provider>
  );
}
