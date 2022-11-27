import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const tracksRouter = router({
  getTracks: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
        q: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tracks = await ctx.prisma.track.findMany({
        take: input.limit,
        skip: input.offset,
        where: { title: input.q },
        orderBy: { id: "desc" },
      });

      return { tracks };
    }),
});

export { tracksRouter };
