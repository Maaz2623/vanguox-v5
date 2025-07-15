import { auth } from "@/lib/auth";
import ChatView from "@/modules/chat/ui/views/chat-view";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { headers } from "next/headers";
import React from "react";

const HomePage = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return <>{!data ? <HomeView /> : <ChatView />
  }</>;
};

export default HomePage;


