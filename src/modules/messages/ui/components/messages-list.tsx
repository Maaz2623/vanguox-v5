"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UIMessage } from "ai";

interface Props {
  messages: UIMessage[];
}

export const MessagesList = ({ messages }: Props) => {
  return (
    <ScrollArea className="h-[500px] w-full overflow-hidden">
      <div className="p-4 h-full w-3/4 border mx-auto">
        {messages.map((message, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap transition-all duration-300"
          >
            {Array.isArray(message.parts) &&
              message.parts.map((part, i) => {
                if (part.type === "text") {
                  return <div key={i}>{part.text}</div>;
                }
                // Optional: fallback for other part types
                return null;
              })}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
