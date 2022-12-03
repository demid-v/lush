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
                  },
                },
              },
            },
            orderBy: { artist_position: "asc" },
          },
          track_genre_rel: {
            select: { genre: { select: { id: true, name: true } } },
            where: { genre: { deleted: false } },
            orderBy: { genre_position: "asc" },
            take: 5,
          },
          track_album_rel: {
            select: {
              album: {
                select: {
                  album_image_rel: {
                    select: {
                      album_image: {
                        select: { domain_id: true, image_id: true },
                      },
                    },
                    where: { is_cover: 1 },
                  },
                },
              },
            },
            orderBy: { album: { id: "asc" } },
            take: 1,
          },
        },
        where: {
          deleted: 0,
          ...(input.search && {
            OR: [
              { title: { contains: input.search } },
              {
                track_artist_rel: {
                  some: { artist: { name: { contains: input.search } } },
                },
              },
            ],
          }),
        },
        orderBy: { id: "desc" },
        take: input.limit,
        skip: input.offset,
      });

      return { tracks };
    }),
});

export { tracksRouter };
