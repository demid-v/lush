import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const playlistsRouter = router({
  getPlaylists: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        offset: z.number().nullish(),
        search: z.string().nullish(),
        playlistId: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input: { limit, offset, search, playlistId } }) => {
      const playlists = await ctx.prisma.playlist.findMany({
        select: {
          id: true,
          name: true,
          playlist_image_rel: {
            select: {
              playlist_image: {
                select: {
                  image_id: true,
                  domain: true,
                  ...(playlistId && { r: true, g: true, b: true }),
                },
              },
            },
            where: { is_cover: true },
            take: 1,
          },
          track_playlist_rel: {
            select: {
              track: {
                select: {
                  name: true,
                  track_artist_rel: { select: { artist: true } },
                  track_genre_rel: {
                    select: { genre: { select: { name: true } } },
                    where: { genre: { deleted: false } },
                  },
                },
              },
            },
            where: { track: { deleted: false } },
          },
        },
        where: {
          ...(playlistId && { id: playlistId }),
          ...(search && { name: { contains: search } }),
          deleted: false,
        },
        orderBy: { id: "desc" },
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return playlists;
    }),
});

export { playlistsRouter };
