"use client";

import { UIMessage, useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function MessageComponent({
  initialMessages,
}: {
  initialMessages: UIMessage[];
}) {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    messages: initialMessages,
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message, i) => (
        <div
          key={i}
          className="whitespace-pre-wrap transition-all duration-300"
        >
          {message.role === "user" ? "User: " : "AI: "}
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
