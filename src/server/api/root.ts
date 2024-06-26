import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { generateRouter } from "~/server/api/routers/generate";
import { checkoutRouter } from "~/server/api/routers/checkout";
import { iconsRouter } from "./routers/icons";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const config = {
  maxDuration: 200,
};
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  generate: generateRouter,
  checkout: checkoutRouter,
  icons: iconsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
