import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const artistsRouter = router({
  getArtists: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        offset: z.number().nullish(),
        search: z.string().nullish(),
        artistId: z.number().nullish(),
      })
    )
    .query(
      async ({ ctx, input: { limit = 120, offset, search, artistId } }) => {
        const artists = await ctx.prisma.artist.findMany({
          select: {
            id: true,
            name: true,
            artist_image_rel: {
              select: {
                artist_image: {
                  select: {
                    image_id: true,
                    domain: true,
                    ...(artistId && { r: true, g: true, b: true }),
                  },
                },
              },
              where: { is_cover: true },
              take: 1,
            },
          },
          where: {
            ...(artistId && { id: artistId }),
            ...(search && { name: { contains: search } }),
            deleted: false,
          },
          orderBy: { id: "desc" },
          ...(limit && { take: limit }),
          ...(offset && { skip: offset }),
        });

        return artists;
      }
    ),
});

export { artistsRouter };
