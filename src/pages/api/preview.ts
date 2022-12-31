import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import type { Table, TablePreview } from "../../utils/types";

const preview = async (_req: NextApiRequest, res: NextApiResponse) => {
  const tables: Table[] = await (
    await fetch("http://localhost:3000/api/tables")
  ).json();

  const artistIds = await prisma.artist.findMany({
    select: { id: true },
    where: {
      id: { gt: 4436 },
      deleted: false,
    },
    take: 102,
  });

  const albumIds: Set<number> = new Set();
  const albumPromises = [];

  for (const { id } of artistIds) {
    const albumId = prisma.album.findMany({
      select: { id: true },
      where: {
        track_album_rel: {
          some: {
            track: {
              track_artist_rel: {
                some: { artist_id: { equals: id } },
              },
            },
          },
        },
        deleted: false,
      },
      orderBy: [
        { album_format_id: "asc" },
        { release_year: "desc" },
        { release_month: "desc" },
        { release_day: "desc" },
      ],
      take: 6,
    });

    albumPromises.push(albumId);

    if (albumPromises.length >= 9) {
      const albumPromisesResolved = await Promise.all(albumPromises);

      for (const albumIdsResolved of albumPromisesResolved) {
        for (const { id } of albumIdsResolved) {
          albumIds.add(id);
        }
      }

      albumPromises.length = 0;
    }
  }

  const albumPromisesResolved = await Promise.all(albumPromises);

  for (const albumIdsResolved of albumPromisesResolved) {
    for (const { id } of albumIdsResolved) {
      albumIds.add(id);
    }
  }

  const trackIdsSelected = await prisma.track.findMany({
    select: { id: true },
    where: {
      deleted: false,
      track_artist_rel: {
        some: {
          artist_id: { in: artistIds.map(({ id }) => id) },
        },
      },
    },
  });

  const trackIds = trackIdsSelected.map(({ id }) => id);

  const artistImageIds = await prisma.artist_image.findMany({
    select: { id: true },
    where: {
      deleted: false,
      artist_image_rel: {
        some: {
          artist_id: { in: artistIds.map(({ id }) => id) },
          is_cover: true,
        },
      },
    },
  });

  const genreIds = await prisma.genre.findMany({
    select: { id: true },
    where: {
      deleted: false,
      track_genre_rel: { some: { track_id: { in: trackIds } } },
    },
  });

  const trackGenreIds = await prisma.track_genre_rel.findMany({
    select: { genre_id: true },
    where: {
      track_id: { in: trackIds },
      genre_id: {
        in: genreIds.map(({ id }) => id),
      },
    },
    distinct: ["genre_id"],
  });

  const albumImageIds = await prisma.album_image.findMany({
    select: { id: true },
    where: {
      deleted: false,
      album_image_rel: {
        some: {
          album_id: { in: [...albumIds] },
          is_cover: true,
        },
      },
    },
  });

  const trackPlaylistIds = await prisma.track_playlist_rel.findMany({
    select: { playlist_id: true },
    where: {
      playlist: {
        deleted: false,
      },
      track_id: { in: trackIds },
    },
  });

  let tablesPreview: TablePreview[] = JSON.parse(JSON.stringify(tables));

  tablesPreview = tablesPreview
    .filter(({ name }) => name !== "track_language_rel")
    .map((table) => {
      if (table.name === "track") {
        table.where = trackIds.map((id) => ({ id }));
      }

      if (table.name === "artist") {
        table.where = artistIds;
      }

      if (table.name === "track_artist_rel") {
        table.where = artistIds.map(({ id }) => ({
          artist_id: id,
        }));
      }

      if (table.name === "artist_image") {
        table.where = artistImageIds;
      }

      if (table.name === "artist_image_rel") {
        table.where = artistImageIds.map(({ id }) => ({
          image_id: id,
        }));
      }

      if (table.name === "genre") {
        table.where = genreIds;
      }

      if (table.name === "track_genre_rel") {
        table.where = trackGenreIds.map(({ genre_id }) => ({
          genre_id,
        }));
      }

      if (table.name === "album") {
        table.where = [...albumIds].map((id) => ({ id }));
      }

      if (table.name === "track_album_rel") {
        table.where = [...albumIds].map((id) => ({
          album_id: id,
        }));
      }

      if (table.name === "album_image") {
        table.where = albumImageIds;
      }

      if (table.name === "album_image_rel") {
        table.where = albumImageIds.map(({ id }) => ({
          image_id: id,
        }));
      }

      if (table.name === "track_playlist_rel") {
        table.where = trackPlaylistIds.map(({ playlist_id }) => ({
          playlist_id,
        }));
      }

      return table;
    });

  res.status(200).json(tablesPreview);
};

export default preview;
