import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const playlistsRouter = router({
  getPlaylists: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        offset: z.number().nullish(),
        search: z.string().nullish(),
        albumId: z.number().nullish(),
        artistId: z.number().nullish(),
      })
    )
    .query(
      async ({ ctx, input: { limit, offset, search, albumId, artistId } }) => {
        const playlists = await ctx.prisma.playlist.findMany({
          select: {
            id: true,
            name: true,
            playlist_image_rel: {
              select: {
                playlist_image: { select: { image_id: true, domain_id: true } },
              },
              where: { is_cover: true },
              take: 1,
            },
            track_playlist_rel: {
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
            deleted: true,
            ...(albumId && { id: albumId }),
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
          orderBy:{ id: "desc" },
          ...(limit && { take: limit }),
          ...(offset && { skip: offset }),
        });

        return playlists;
      }
    ),
});

export { playlistsRouter };
