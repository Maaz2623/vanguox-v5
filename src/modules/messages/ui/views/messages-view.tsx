"use client";
import { UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";
import { MessagesList } from "../components/messages-list";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageForm } from "../components/message-form";

interface Props {
  uiMessages: UIMessage[];
  chatId: string;
}

export const MessagesView = ({ uiMessages, chatId }: Props) => {
  const alreadySent = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { messages, sendMessage, status, stop } = useChat({
    messages: uiMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        chatId: chatId,
      },
    }),
  });

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

  console.log(uiMessages);

  return (
    <div className="flex h-full flex-col justify-start relative items-center">
      <div className="relative w-full">
        <MessagesList messages={messages} status={status} />
        <div className="bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-900 h-10 w-full absolute bottom-0 " />
      </div>

      <div className="absolute bottom-3 w-3/4">
        <MessageForm status={status} stop={stop} sendMessage={sendMessage} />
      </div>
    </div>
  );
};
