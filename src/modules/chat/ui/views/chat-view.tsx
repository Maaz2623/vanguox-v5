"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { ChatViewSidebar } from "../components/chat-view-sidebar";
import { ChatViewSiteHeader } from "../components/chat-view-site-header";
import { MessagesView } from "@/modules/messages/ui/views/messages-view";
import { UIMessage } from "ai";
import { NewMessagesView } from "@/modules/messages/ui/components/new-messages-view";

interface Props {
  initialMessages?: UIMessage[];
  chatId?: string;
}

const ChatView = ({ initialMessages, chatId }: Props) => {
  return (
    <SidebarProvider
      className="dark:bg-neutral-900 bg-neutral-100 h-screen"
      // style={
      //   {
      //     "--sidebar-width": "calc(var(--spacing) * 72)",
      //     "--header-height": "calc(var(--spacing) * 12)",
      //   } as React.CSSProperties
      // }
    >
      <ChatViewSidebar
        variant="inset"
        className="border-r border-neutral-200 dark:border-neutral-800"
      />
      <SidebarInset className="bg-transparent shadow-none! m-0! rounded-none! border-none!">
        <ChatViewSiteHeader />
        {!chatId || !initialMessages ? (
          <NewMessagesView />
        ) : (
          <MessagesView uiMessages={initialMessages} chatId={chatId} />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatView;
