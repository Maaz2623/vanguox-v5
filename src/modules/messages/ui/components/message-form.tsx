"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { AnimatePresence, motion } from "framer-motion";

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        className="w-full"
        key="message-form"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                  if (e.shiftKey) return; // Allow newline
                  e.preventDefault();
                  if (e.ctrlKey || !e.metaKey) {
                    onSubmit(e);
                  }
                }
              }}
            />

            <div className="h-8 flex justify-between items-center">
              <div />
              <Button size="icon" type="submit">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "ready" ? (
                    <motion.div
                      key="arrow"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpIcon />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="square"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SquareIcon className="fill-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
