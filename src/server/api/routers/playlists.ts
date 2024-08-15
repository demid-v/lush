import { and, desc, eq, like, lt } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const playlistRouter = createTRPCRouter({
  page: publicProcedure
    .input(
      z.object({
        limit: z.number().default(120),
        cursor: z.number().nullish(),
        search: z.string().nullish(),
        playlistId: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input: { limit, cursor, search, playlistId } }) => {
      const playlists = await ctx.db.query.playlist.findMany({
        columns: {
          id: true,
          name: true,
        },
        with: {
          playlist_image_rels: {
            columns: {},
            with: {
              playlist_image: {
                columns: {
                  image_id: true,
                  ...(playlistId && { r: true, g: true, b: true }),
                },
                with: { domain: true },
              },
            },
            where: (playlistImageRel) => eq(playlistImageRel.is_cover, 1),
            limit: 1,
          },
        },
        where: (playlist) =>
          and(
            eq(playlist.deleted, 0),
            cursor != null ? lt(playlist.id, cursor) : undefined,
            search != null ? like(playlist.name, `%${search}%`) : undefined,
            playlistId != null ? eq(playlist.id, playlistId) : undefined,
          ),
        orderBy: (playlist) => desc(playlist.id),
        limit,
      });

      const nextCursor = playlists.at(-1)?.id ?? 0;

      return { playlists, nextCursor };
    }),
});

export { playlistRouter };
