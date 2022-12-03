import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const artistsRouter = router({
  getArtists: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const artists = await ctx.prisma.artist.findMany({
        orderBy: { id: "desc" },
        take: input.limit,
        skip: input.offset,
      });

      return { artists };
    }),
});

export { artistsRouter };
