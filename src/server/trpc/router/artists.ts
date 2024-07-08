import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import type { Db } from "../../db";
import { and, desc, eq, like, lt } from "drizzle-orm";
import { artist } from "../../db/schema";

const getArtists = async (
  db: Db,
  {
    limit,
    cursor,
    search,
    artistId,
  }: {
    limit?: number;
    cursor?: number | null | undefined;
    search?: string | null | undefined;
    artistId?: number | null | undefined;
  }
) => {
  const artists = await db.query.artist.findMany({
    columns: {
      id: true,
      name: true,
    },
    with: {
      artist_image_rels: {
        columns: {},
        with: {
          artist_image: {
            columns: {
              image_id: true,
              ...(artistId && { r: true, g: true, b: true }),
            },
            with: {
              domain: true,
            },
          },
        },
      },
    },
    where: and(
      cursor != null ? lt(artist.id, cursor) : undefined,
      artistId != null ? eq(artist.id, artistId) : undefined,
      search != null ? like(artist.name, `%${search}%`) : undefined,
      eq(artist.deleted, 0)
    ),
    orderBy: desc(artist.id),
    limit,
  });

  const nextCursor = artists.at(-1)?.id ?? 0;

  return { artists, nextCursor };
};

const artistsRouter = router({
  getArtists: publicProcedure
    .input(
      z.object({
        limit: z.number().default(120),
        cursor: z.number().nullish(),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await getArtists(ctx.db, input);
    }),
  getArtist: publicProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        artistId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await getArtists(ctx.db, input);
    }),
});

export { artistsRouter };
