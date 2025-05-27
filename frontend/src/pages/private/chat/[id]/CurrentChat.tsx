import { Conversation } from "@/api/api";
import MessageInput from "@/components/MessageInput";
import {
  useConversationContext,
  useMainLayout,
  useUserContext,
} from "@/hooks/useContext";
import { getSocket } from "@/lib/socket";
import { ConversationDetailResponse } from "@/schemas/conversation";
import { Message } from "@/schemas/message";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export default function CurrentChat() {
  const jwt = Cookies.get("token");
  const { user } = useUserContext();
  const { conversations } = useConversationContext();
  const { id } = useParams();
  const { setTitle } = useMainLayout();
  const safeId = id!;
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = getSocket(jwt!);

  const handleSendMessage = (message: string) => {
    socket.emit("message", {
      content: message,
      type: "TEXT",
      conversationId: safeId,
      });
  };

  const currentChat = conversations?.find((chat) => chat.id === safeId);
  const { data, isLoading } = useQuery({
    queryKey: ["conversation", safeId],
    queryFn: () => Conversation.getById(safeId, jwt!),
  });

  useEffect(() => {
    if (currentChat && currentChat.title) {
      setTitle(currentChat.title);
    }
  }, [currentChat, setTitle, jwt]);

  if (isLoading) return <span>Carregando...</span>;

  if (data) {
    const { conversation } = data as ConversationDetailResponse;
    const sortedMessages: Message[] = conversation.participants
      .flatMap((participant) =>
        participant.messages.map((message) => ({
          ...message,
          sender: participant.userId,
        }))
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    return (
      <div className="h-full flex flex-col relative">
        <main className="flex flex-col gap-2 p-4 justify-end">
          {sortedMessages.map((message) => {
            const isCurrentUser = message.sender === user?.id;

            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                    isCurrentUser
                      ? "bg-chart-4 text-white rounded-br-none"
                      : "bg-slate-500  text-white rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="block text-xs opacity-70 mt-1 text-right">
                    {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </main>
        <footer className=" w-full flex justify-center items-center gap-2 border-t p-2 absolute bottom-0">
          <MessageInput onSend={handleSendMessage} />
        </footer>
        <div ref={scrollRef} />
      </div>
    );
  }
}
