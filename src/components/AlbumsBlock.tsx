"use client";

import { api } from "~/trpc/react";
import Tile from "./Tile";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const defaultImage = "/assets/vynil.svg";

const Albums = () => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const { data: albumsData } = api.album.page.useInfiniteQuery(
    { search: q, limit: 120 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const albums = useMemo(
    () => albumsData?.pages.flatMap((page) => page.albums) ?? [],
    [albumsData?.pages],
  );

  return (
    <>
      {albums.map(({ id, name, album_image_rels: images }) => (
        <Tile
          key={id}
          data={{
            id,
            domain: "albums",
            name,
            image: images[0]?.album_image,
            defaultImage,
          }}
        />
      ))}
    </>
  );
};

export default Albums;
