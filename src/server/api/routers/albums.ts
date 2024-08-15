import { and, asc, desc, eq, inArray, like, lt } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { track, trackAlbumRel, trackArtistRel } from "~/server/db/schema";

const albumRouter = createTRPCRouter({
  page: publicProcedure
    .input(
      z.object({
        limit: z.number().default(120),
        cursor: z.number().nullish(),
        search: z.string().nullish(),
        albumId: z.number().nullish(),
        artistId: z.number().nullish(),
      }),
    )
    .query(
      async ({ ctx, input: { limit, cursor, search, albumId, artistId } }) => {
        const albums = await ctx.db.query.album.findMany({
          columns: {
            id: true,
            name: true,
          },
          with: {
            album_image_rels: {
              columns: {},
              with: {
                album_image: {
                  columns: {
                    image_id: true,
                    ...(albumId && { r: true, g: true, b: true }),
                  },
                  with: { domain: true },
                },
              },
              where: (albumImageRel) => eq(albumImageRel.is_cover, 1),
              limit: 1,
            },
          },
          where: (album) =>
            and(
              eq(album.deleted, 0),
              cursor != null ? lt(album.id, cursor) : undefined,
              search != null ? like(album.name, `%${search}%`) : undefined,
              albumId != null ? eq(album.id, albumId) : undefined,
              artistId != null
                ? inArray(
                    album.id,
                    db
                      .select({ id: trackAlbumRel.album_id })
                      .from(trackAlbumRel)
                      .leftJoin(track, eq(trackAlbumRel.track_id, track.id))
                      .leftJoin(
                        trackArtistRel,
                        eq(track.id, trackArtistRel.track_id),
                      )
                      .where(eq(trackArtistRel.artist_id, artistId)),
                  )
                : undefined,
            ),
          orderBy: (album) =>
            artistId == null
              ? desc(album.id)
              : [
                  asc(album.album_format_id),
                  desc(album.release_year),
                  desc(album.release_month),
                  desc(album.release_day),
                ],
          limit,
        });

        const nextCursor = albums.at(-1)?.id ?? 0;

        return { albums, nextCursor };
      },
    ),
});

export { albumRouter };
