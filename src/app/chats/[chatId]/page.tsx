import ChatView from "@/modules/chat/ui/views/chat-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { UIMessage } from "ai";
import React from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatIdPage = async ({ params }: Props) => {
  const { chatId } = await params;

  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(
    trpc.chat.getChat.queryOptions({
      chatId: chatId,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uiMessages: UIMessage[] = data.messages.map((msg: any, i: number) => ({
    id: `msg-${i}`,
    role: msg.role,
    parts: msg.parts ?? msg.content ?? [], // Handle both shapes
  }));

  return <ChatView initialMessages={uiMessages} chatId={chatId} />;
};

export default ChatIdPage;
