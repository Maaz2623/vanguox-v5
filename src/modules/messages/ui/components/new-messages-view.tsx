"use client";
import Image from "next/image";
import TextAreaAutoSize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const NewMessagesView = () => {
  const [input, setInput] = useState("");

  const trpc = useTRPC();

  const createChat = useMutation(trpc.chat.create.mutationOptions());

  const router = useRouter();
  const onSubmit = () => {
    if (!input.trim()) return;

    createChat.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/chats/${data}?input=${encodeURIComponent(input)}`);
      },
    });
  };

  return (
    <div>
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key="new-messages-view-logo"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[300px] flex flex-col justify-center mt-10 items-center text-center"
        >
          <Image src="/logo.svg" alt="logo" width={100} height={100} priority />
          <h1 className="text-4xl font-semibold mt-4">Vanguox AI</h1>
          <p className="text-md text-muted-foreground mt-2">
            A powerful AI system designed to enhance ideas and streamline
            creation.
          </p>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key="new-messages-view-logo"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-2/3 mx-auto"
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
