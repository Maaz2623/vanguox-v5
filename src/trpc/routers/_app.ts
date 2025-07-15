import { createTRPCRouter } from '../init';
import { chatRouter } from '@/modules/chat/server/chat.procedure';
export const appRouter = createTRPCRouter({
  chat: chatRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;