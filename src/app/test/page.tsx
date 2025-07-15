import { db } from "@/db";
import React from "react";
import MessageComponent from "./message";
import { chatsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UIMessage } from "ai";

const TestPage = async () => {
  const [data] = await db
    .select()
    .from(chatsTable)
    .where(eq(chatsTable.title, "Demo Chat"));

  if (!data) return <div>loading...</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uiMessages: UIMessage[] = data.messages.map((msg: any, i: number) => ({
    id: `msg-${i}`, // ideally use real IDs if available
    role: msg.role,
    parts: msg.content, // Rename content → parts
  }));

  return (
    <div>
      <MessageComponent initialMessages={uiMessages} />
    </div>
  );
};

export default TestPage;
