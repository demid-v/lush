import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const albumsRouter = router({
  getAlbums: publicProcedure
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
      async ({
        ctx,
        input: { limit = 120, offset, search, albumId, artistId },
      }) => {
        const albums = await ctx.prisma.album.findMany({
          select: {
            id: true,
            name: true,
            album_image_rel: {
              select: {
                album_image: {
                  select: {
                    image_id: true,
                    domain: true,
                    ...(albumId && { r: true, g: true, b: true }),
                  },
                },
              },
              where: { is_cover: true },
              take: 1,
            },
            track_album_rel: {
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
            ...(albumId && { id: albumId }),
            ...(artistId && {
              track_album_rel: {
                some: {
                  track: {
                    track_artist_rel: { some: { artist: { id: artistId } } },
                  },
                },
              },
              deleted: false,
            }),
            ...(search && { name: { contains: search } }),
          },
          orderBy: artistId
            ? [
                { album_format_id: "asc" },
                { release_year: "desc" },
                { release_month: "desc" },
                { release_day: "desc" },
              ]
            : { id: "desc" },
          ...(limit && { take: limit }),
          ...(offset && { skip: offset }),
        });

        return albums;
      }
    ),
});

export { albumsRouter };
