import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";


export const messageRouter = createTRPCRouter({
    create: protectedProcedure.input(z.object({
        prompt: z.string(),
        chatId: z.string()
    })).mutation(async ({input}) => {
    })
})