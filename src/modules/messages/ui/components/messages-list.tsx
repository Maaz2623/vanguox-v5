"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UIMessage } from "ai";
import { MessagesCard } from "./message-card";

interface Props {
  messages: UIMessage[];
}

export const MessagesList = ({ messages }: Props) => {
  return (
    <ScrollArea className="h-[500px] w-full overflow-hidden relative">
      <div className=" bg-gradient-to-b z-50 from-neutral-100 dark:from-neutral-900 to-transparent h-6 w-full absolute top-0" />
      <div className="p-4 h-full w-3/4 mx-auto pt-10 pb-40 space-y-8">
        {messages.map((message) => (
          <MessagesCard
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
      </div>
    </ScrollArea>
  );
};
