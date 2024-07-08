import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { and, desc, eq, inArray, like, lt } from "drizzle-orm";
import {
  genre,
  track,
  trackAlbumRel,
  trackArtistRel,
  trackPlaylistRel,
} from "../../db/schema";
import { db } from "../../db";

const tracksRouter = router({
  getTracks: publicProcedure
    .input(
      z.object({
        limit: z.number().default(100),
        cursor: z.number().nullish(),
        search: z.string().nullish(),
        artistId: z.number().nullish(),
        albumId: z.number().nullish(),
        playlistId: z.number().nullish(),
      })
    )
    .query(
      async ({
        ctx,
        input: { limit, cursor, search, artistId, albumId, playlistId },
      }) => {
        const tracks = await ctx.db.query.track.findMany({
          with: {
            track_artist_rels: {
              with: {
                artist: {
                  with: {
                    artist_image_rels: {
                      with: { artist_image: { with: { domain: true } } },
                    },
                  },
                },
              },
            },
            track_album_rels: {
              with: {
                album: {
                  with: {
                    album_image_rels: {
                      with: { album_image: { with: { domain: true } } },
                    },
                  },
                },
              },
            },
            track_genre_rels: {
              with: { genre: true },
              where: (trackGenreRels) =>
                inArray(
                  trackGenreRels.genre_id,
                  db
                    .select({ id: genre.id })
                    .from(genre)
                    .where(eq(genre.deleted, 0))
                ),
            },
          },
          where: and(
            cursor != null ? lt(track.id, cursor) : undefined,
            search != null ? like(track.name, `%${search}%`) : undefined,
            artistId != null
              ? inArray(
                  track.id,
                  ctx.db
                    .select({ id: trackArtistRel.track_id })
                    .from(trackArtistRel)
                    .where(eq(trackArtistRel.artist_id, artistId))
                )
              : undefined,
            albumId != null
              ? inArray(
                  track.id,
                  ctx.db
                    .select({ id: trackAlbumRel.track_id })
                    .from(trackAlbumRel)
                    .where(eq(trackAlbumRel.album_id, albumId))
                )
              : undefined,
            playlistId != null
              ? inArray(
                  track.id,
                  ctx.db
                    .select({ id: trackPlaylistRel.track_id })
                    .from(trackPlaylistRel)
                    .where(eq(trackPlaylistRel.playlist_id, playlistId))
                )
              : undefined
          ),
          orderBy: [desc(track.id)],
          limit,
        });

        const nextCursor = tracks.at(-1)?.id ?? 0;

        return { tracks, nextCursor };
      }
    ),
});

export { tracksRouter };
