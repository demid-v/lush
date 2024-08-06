"use client";

import Tile from "./tile";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

const defaultImage = "/assets/vynil.svg";

const Albums = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toString();

  const {
    data: albumsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.album.page.useInfiniteQuery(
    { search: q, limit: 120 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const albums = useMemo(
    () => albumsData?.pages.flatMap((page) => page.albums) ?? [],
    [albumsData?.pages],
  );

  const { ref: albumsRef } = useInView({
    triggerOnce: true,
    onChange(inView) {
      if (!inView || isFetching || !hasNextPage) return;

      void fetchNextPage();
    },
  });

  return (
    <>
      {albums.map(({ id, name, album_image_rels: images }, index) => (
        <Tile
          key={id}
          ref={index === albums.length - 1 ? albumsRef : null}
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
