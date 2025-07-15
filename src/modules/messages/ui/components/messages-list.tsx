"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UIMessage } from "ai";
import { MessagesCard } from "./message-card";
import { useChat } from "@ai-sdk/react";
import { MessageGenerating } from "./message-generating";
import { useEffect, useRef } from "react";

interface Props {
  messages: UIMessage[];
  status: ReturnType<typeof useChat>["status"];
}

export const MessagesList = ({ messages, status }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "user";

  const lastIndex = messages.length - 1;

  const streamingMessage =
    messages[lastIndex]?.role === "assistant" && status === "streaming"
      ? messages[lastIndex]
      : null;

  const stableMessages = streamingMessage ? messages.slice(0, -1) : messages;

  useEffect(() => {
    if (isLastMessageUser || status === "submitted") {
      const frame = requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => cancelAnimationFrame(frame);
    }

    if (!messages || messages.length === 0) return;

    if (status === "streaming") {
      return;
    }
  }, [messages.length, messages, status, isLastMessageUser]); // only when a new message is added

  return (
    <ScrollArea className="h-[500px] w-full overflow-hidden relative">
      <div className=" bg-gradient-to-b z-50 from-neutral-100 dark:from-neutral-900 to-transparent h-6 w-full absolute top-0" />
      <div className="p-4 h-full w-3/4 mx-auto pt-10 pb-40 space-y-8">
        {stableMessages.map((message) => (
          <MessagesCard
            status={status}
            role={message.role}
            parts={message.parts}
            key={message.id}
          />
          // <div
          //   key={i}
          //   className="whitespace-pre-wrap transition-all duration-300"
          // >
          //   {Array.isArray(message.parts) &&
          //     message.parts.map((part, i) => {
          //       if (part.type === "text") {
          //         return <div key={i}>{part.text}</div>;
          //       }
          //       // Optional: fallback for other part types
          //       return null;
          //     })}
          // </div>
        ))}
        {streamingMessage && (
          <div>
            <MessagesCard
              status={status}
              role={streamingMessage.role}
              parts={streamingMessage.parts}
              key={streamingMessage.id}
            />
          </div>
        )}
        {status === "submitted" && <MessageGenerating />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
