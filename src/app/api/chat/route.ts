import { db } from '@/db';
import { chatsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, smoothStream } from 'ai';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {

  const data = await auth.api.getSession({
    headers: await headers()
  })


  if(!data) {
    throw new Error("Unauthorized")
  }



  const { messages }: { messages: UIMessage[] } = await req.json();



  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToModelMessages(messages),
    experimental_transform: smoothStream({
      delayInMs: 50,
      chunking: "word",
    }),
    async onFinish({ response }) {
      const latest = response.messages.at(-1); // get only the latest message
      if (!latest) return;

      const [chat] = await db
        .select()
        .from(chatsTable)
        .where(eq(chatsTable.title, "Demo Chat"));

      if (!chat) return;

      const updatedMessages = [...(chat.messages ?? []), latest];

      await db
        .update(chatsTable)
        .set({ messages: updatedMessages as UIMessage[] })
        .where(eq(chatsTable.title, "Demo Chat"));
    },
  });

  return result.toUIMessageStreamResponse();
}
