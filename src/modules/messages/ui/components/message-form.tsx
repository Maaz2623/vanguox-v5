"use client";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

type SendMessage = ReturnType<typeof useChat>["sendMessage"];

interface Props {
  sendMessage: SendMessage;
}

export const MessageForm = ({ sendMessage }: Props) => {
  const [input, setInput] = useState("");

  const onSubmit = () => {
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="w-full">
      <div className="rounded-lg w-full mx-auto bg-neutral-200 dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-300 overflow-hidden p-2">
        <form onSubmit={onSubmit}>
          <TextAreaAutoSize
            minRows={1}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxRows={1}
            className="px-3 py-3 resize-none text-sm border-none w-full outline-none bg-transparent"
            placeholder="What would you like to build?"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  // Allow newline (default behavior)
                  return;
                } else {
                  e.preventDefault();
                  if (e.ctrlKey || !e.metaKey) {
                    onSubmit();
                  }
                }
              }
            }}
          />

          <div className="h-8 flex justify-between items-center">
            <div />
            <Button size={`icon`} type="submit">
              <ArrowUpIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
