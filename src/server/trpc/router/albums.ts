import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const albumsRouter = router({
  getAlbums: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        offset: z.number().nullish(),
        search: z.string().nullish(),
        artistId: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input: { limit, offset, search, artistId } }) => {
      const albums = await ctx.prisma.album.findMany({
        select: {
          id: true,
          title: true,
          album_image_rel: {
            select: {
              album_image: { select: { image_id: true, domain_id: true } },
            },
            where: { is_cover: 1 },
            take: 1,
          },
          track_album_rel: {
            select: {
              track: {
                select: {
                  title: true,
                  track_artist_rel: { select: { artist: true } },
                  track_genre_rel: {
                    select: { genre: { select: { name: true } } },
                    where: { genre: { deleted: false } },
                  },
                },
              },
            },
            where: { track: { deleted: 0 } },
          },
        },
        where: {
          deleted: 0,
          ...(artistId && {
            track_album_rel: {
              some: {
                track: {
                  track_artist_rel: { some: { artist: { id: artistId } } },
                },
              },
            },
          }),
          ...(search && { title: { contains: search } }),
        },
        orderBy: { id: "desc" },
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { albums };
    }),
});

export { albumsRouter };
