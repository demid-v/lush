import type { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const getArtists = async (
  prisma: PrismaClient,
  {
    limit,
    offset,
    search,
    artistId,
  }: {
    limit?: number | null | undefined;
    offset?: number | null | undefined;
    search?: string | null | undefined;
    artistId?: number | null | undefined;
  }
) => {
  const artists = await prisma.artist.findMany({
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
};

const artistsRouter = router({
  getArtists: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        offset: z.number().nullish(),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const artists = getArtists(ctx.prisma, input);

      return artists;
    }),
  getArtist: publicProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        artistId: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.artistId === undefined) return [];

      const artists = getArtists(ctx.prisma, input);

      return artists;
    }),
});

export { artistsRouter };
