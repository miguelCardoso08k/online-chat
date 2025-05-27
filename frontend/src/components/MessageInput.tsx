import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";

export default function ChatInput({
  onSend,
}: {
  onSend: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend(message);
        setMessage("");
      }
      setMessage("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
        w-full max-h-32 min-h-11 resize-none overflow-y-auto rounded-md border bg-white p-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary dark:bg-zinc-900 dark:text-white"
        rows={1}
      />
      <Button
        size="icon"
        onClick={() => {
          if (message.trim()) {
            onSend(message);
            setMessage("");
          }
          setMessage("");
        }}
      >
        <SendHorizonal />
      </Button>
    </>
  );
}
