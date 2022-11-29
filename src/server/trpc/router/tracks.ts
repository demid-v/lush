import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const tracksRouter = router({
  getTracks: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tracks = await ctx.prisma.track.findMany({
        select: {
          id: true,
          title: true,
          duration: true,
          youtube_video_id: true,
          track_artist_rel: {
            select: {
              artist: {
                include: {
                  artist_image_rel: { select: { artist_image: true } },
                },
              },
            },
          },
          track_genre_rel: { select: { genre: true } },
          track_album_rel: {
            select: {
              album: {
                include: { album_image_rel: { select: { album_image: true } } },
              },
            },
          },
        },
        ...(input.search && { where: { title: { contains: input.search } } }),
        orderBy: { id: "desc" },
        take: input.limit,
        skip: input.offset,
      });

      return { tracks };
    }),
});

export { tracksRouter };
