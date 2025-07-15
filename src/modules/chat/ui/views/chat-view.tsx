import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { ChatViewSidebar } from "../components/chat-view-sidebar";
import { ChatViewSiteHeader } from "../components/chat-view-site-header";
import { MessagesView } from "@/modules/messages/ui/views/messages-view";

interface Props {
  chatId?: string;
}

const ChatView = ({ chatId }: Props) => {
  return (
    <SidebarProvider
      className="dark:bg-neutral-900 bg-neutral-100"
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
        <MessagesView chatId={chatId} />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatView;
