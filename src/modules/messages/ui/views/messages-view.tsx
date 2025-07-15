"use client";
import { cn } from "@/lib/utils";
import { MessageForm } from "../components/message-form";
import { NewMessagesView } from "../components/new-messages-view";

interface Props {
  chatId?: string;
}

export const MessagesView = ({ chatId }: Props) => {
  return (
    <div className="h-full flex flex-col justify-center relative items-center border">
      {!chatId ? <NewMessagesView /> : "Messages List"}
      <div
        className={cn("w-2/3 absolute bottom-24", chatId && "bottom-2 w-/3/4")}
      >
        <MessageForm />
      </div>
    </div>
  );
};
