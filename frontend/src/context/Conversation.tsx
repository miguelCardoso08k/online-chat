import { Conversation } from "@/schemas/conversation";
import { createContext } from "react";

export type ConversationContextType = {
  conversations: Conversation[] | undefined;
  isLoading: boolean;
  refetch: () => void;
};

export const ConversationContext =
  createContext<ConversationContextType | null>(null);
