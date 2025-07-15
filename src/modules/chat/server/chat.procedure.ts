import { db } from "@/db";
import { chatsTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import z from "zod";

export const chatRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async () => {
        const [newChat] = await db.insert(chatsTable).values({
            title: "New Chat"
        }).returning()
        return newChat.id
    }),
    getChat: protectedProcedure.input(z.object({
        chatId: z.string()
    })).query(async ({input}) => {
        const [chat] = await db.select().from(chatsTable).where(eq(chatsTable.id, input.chatId))

        if(!chat) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Chat does not exist"
            })
        }

        return chat
    })
})