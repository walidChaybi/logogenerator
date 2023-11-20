import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
  generateIcon: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log("hello from trpc", input.prompt);
      return {
        message: "Success",
      };
    }),
});
