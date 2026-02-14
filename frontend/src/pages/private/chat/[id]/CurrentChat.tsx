import { Conversation } from "@/api/api";
import MessageInput from "@/components/MessageInput";
import { useMainLayout, useUserContext } from "@/hooks/useContext";
import { getSocket } from "@/lib/socket";
import { ConversationDetailResponse } from "@/schemas/conversation";
import { Message } from "@/schemas/message";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export default function CurrentChat() {
  const jwt = Cookies.get("token");
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const { id } = useParams();
  const { setTitle } = useMainLayout();
  const safeId = id!;
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = getSocket();

  const handleSendMessage = (message: string) => {
    socket.emit("send_message", {
      content: message,
      type: "TEXT",
      conversationId: safeId,
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["conversation", safeId],
    queryFn: () => Conversation.getById(safeId, jwt!),
  });

  useEffect(() => {
    socket.on("received_message", (newMessage: Message) => {
      console.log("here");
      console.log(newMessage);
      queryClient.setQueryData<ConversationDetailResponse>(
        ["conversation", safeId],
        (oldData) => {
          if (!oldData) return oldData;
          const alreadyExists = oldData.conversation.messages.some(
            (message) => message.id === newMessage.id,
          );

          if (alreadyExists) return oldData;

          return {
            ...oldData,
            conversation: {
              ...oldData.conversation,
              messages: [...oldData.conversation.messages, newMessage],
            },
          };
        },
      );
    });
  }, [jwt, socket, queryClient, safeId]);

  if (isLoading) return <span>Carregando...</span>;

  if (data) {
    const { conversation } = data as ConversationDetailResponse;
    setTitle(conversation.title || "chat");
    const messages: Message[] = conversation.messages;

    return (
      <div className="h-screen flex flex-col">
        <main className="flex-1 min-h-0 flex overflow-y-auto flex-col gap-2 p-4 justify-end">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === user?.id;

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

        <footer className=" w-full flex justify-center items-center gap-2 border-t p-2 ">
          <MessageInput onSend={handleSendMessage} />
        </footer>
        <div ref={scrollRef} />
      </div>
    );
  }
}
