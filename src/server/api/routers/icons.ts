/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// export const config = {
//   maxDuration: 200,
// };

export const iconsRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session!.user.id,
      },
    });
    return icons;
  }),
  getCommunityIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    return icons;
  }),
});
