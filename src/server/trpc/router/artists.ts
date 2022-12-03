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
        select: {
          id: true,
          name: true,
          artist_image_rel: {
            select: {
              artist_image: {
                select: {
                  image_id: true,
                  domain: true,
                },
              },
            },
            where: { is_cover: 1 },
            take: 1,
          },
        },
        orderBy: { id: "desc" },
        take: input.limit,
        skip: input.offset,
      });

      return { artists };
    }),
});

export { artistsRouter };
