"use client";

import Tile from "./Tile";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/trpc/react";

const defaultImage = "/assets/note.svg";

const ArtistsBlock = () => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const { data: artistsData } = api.artist.page.useInfiniteQuery(
    { search: q, limit: 120 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const artists = useMemo(
    () => artistsData?.pages.flatMap((page) => page.artists) ?? [],
    [artistsData?.pages],
  );

  return (
    <>
      {artists.map(({ id, name, artist_image_rels: images }) => (
        <Tile
          key={id}
          data={{
            id,
            domain: "artists",
            name,
            image: images[0]?.artist_image,
            defaultImage,
          }}
        />
      ))}
    </>
  );
};

export default ArtistsBlock;
