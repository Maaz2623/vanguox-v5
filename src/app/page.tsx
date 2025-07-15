import { auth } from "@/lib/auth";
import ChatView from "@/modules/chat/ui/views/chat-view";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { headers } from "next/headers";
import React from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const HomePage = async ({ params }: Props) => {
  const { chatId } = await params;



  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return <>{!data ? <HomeView /> : <ChatView chatId={chatId} />}</>;
};

export default HomePage;
