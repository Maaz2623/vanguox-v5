import { db } from '@/db';
import { chatsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { google } from '@ai-sdk/google';
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  smoothStream,
} from 'ai';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export const maxDuration = 200;

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  const { messages, chatId }: { messages: UIMessage[]; chatId: string } =
    await req.json();

  const latestUserMessage = messages.at(-1);
  if (!latestUserMessage || latestUserMessage.role !== 'user') {
    throw new Error('Missing user message');
  }

  // Save the user message
  const [chat] = await db
    .select()
    .from(chatsTable)
    .where(eq(chatsTable.id, chatId));

  if (!chat) {
    throw new Error('Chat not found');
  }

  const updatedWithUser = [...(chat.messages ?? []), latestUserMessage];

  const trimmedMessages = updatedWithUser.slice(-6)

  await db
    .update(chatsTable)
    .set({ messages: updatedWithUser })
    .where(eq(chatsTable.id, chatId));

  // Now stream the assistant's reply and save that too
  const result = streamText({
    model: google('gemini-2.0-flash'),
    messages: convertToModelMessages(trimmedMessages),
    tools: {
      google_search: google.tools.googleSearch({})
    },
    experimental_transform: smoothStream({
      delayInMs: 50,
      chunking: 'word',
    }),
    async onFinish({ response }) {
      const latestAssistantMessage = response.messages.at(-1);
      if (!latestAssistantMessage) return;

      const [chatAfterUser] = await db
        .select()
        .from(chatsTable)
        .where(eq(chatsTable.id, chatId));

      if (!chatAfterUser) return;

      const updatedMessages = [
        ...(chatAfterUser.messages ?? []),
        latestAssistantMessage,
      ];

      await db
        .update(chatsTable)
        .set({ messages: updatedMessages as UIMessage[] })
        .where(eq(chatsTable.id, chatId));
    },
  });

  return result.toUIMessageStreamResponse();
}
