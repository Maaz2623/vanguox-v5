"use client";
import { cn } from "@/lib/utils";
import { UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { MessagesList } from "../components/messages-list";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  uiMessages: UIMessage[];
  chatId: string;
}

export const MessagesView = ({ uiMessages, chatId }: Props) => {
  const alreadySent = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { messages, sendMessage } = useChat({
    messages: uiMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        chatId: chatId,
      },
    }),
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    const initialInput = searchParams.get("input");

    if (initialInput && !alreadySent.current) {
      sendMessage({ text: initialInput });
      alreadySent.current = true;

      // ✅ Remove the input param from the URL after sending
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("input");

      const newUrl =
        window.location.pathname +
        (newParams.toString() ? `?${newParams}` : "");

      router.replace(newUrl); // doesn't reload the page
    }
  }, [sendMessage, searchParams, router]);

  const onSubmit = () => {
    sendMessage({ text: input });
    setInput("");
    console.log(messages);
  };

  console.log(uiMessages);

  return (
    <div className="h-full flex flex-col justify-start relative items-center border">
      <MessagesList messages={messages} />

      <div
        className={cn("w-2/3 absolute bottom-24", chatId && "bottom-3 w-3/4")}
      >
        <div className="w-full mt-10">
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
      </div>
    </div>
  );
};
