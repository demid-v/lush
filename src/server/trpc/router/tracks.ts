import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const tracksRouter = router({
  getTracks: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
        search: z.string().nullish(),
        artistId: z.number().nullish(),
        albumId: z.number().nullish(),
        playlistId: z.number().nullish(),
      })
    )
    .query(
      async ({
        ctx,
        input: { limit, offset, search, artistId, albumId, playlistId },
      }) => {
        const tracks = await ctx.prisma.track.findMany({
          select: {
            id: true,
            name: true,
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
                      where: { is_cover: true },
                      take: 1,
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
                track_position: true,
                album: {
                  select: {
                    album_image_rel: {
                      select: {
                        album_image: {
                          select: { domain: true, image_id: true },
                        },
                      },
                      where: { is_cover: true },
                      take: 1,
                    },
                  },
                },
              },
              orderBy: { album: { id: "asc" } },
              take: 1,
            },
          },
          where: {
            ...(search && {
              OR: [
                { name: { contains: search } },
                {
                  track_artist_rel: {
                    some: { artist: { name: { contains: search } } },
                  },
                },
              ],
            }),
            ...(artistId && {
              track_artist_rel: { some: { artist_id: artistId } },
            }),
            ...(albumId && {
              track_album_rel: { some: { album_id: albumId } },
            }),
            ...(playlistId && {
              track_playlist_rel: { some: { playlist_id: playlistId } },
            }),
            deleted: false,
          },
          orderBy: { id: "desc" },
          take: limit,
          skip: offset,
        });

        return tracks;
      }
    ),
});

export { tracksRouter };
