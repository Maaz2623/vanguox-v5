"use client";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

type SendMessage = ReturnType<typeof useChat>["sendMessage"];

type Status = ReturnType<typeof useChat>["status"];

type Stop = ReturnType<typeof useChat>["stop"];

interface Props {
  sendMessage: SendMessage;
  status: Status;
  stop: Stop;
}

export const MessageForm = ({ sendMessage, status }: Props) => {
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
              {status === "ready" ? (
                <ArrowUpIcon />
              ) : (
                <SquareIcon className="fill-white" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
