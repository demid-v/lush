"use client";

import { api } from "~/trpc/react";
import Tile from "./tile";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

const defaultImage = "/assets/vynil.svg";
const albumsLimit = 120;

const Albums = () => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const {
    data: albumsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.album.page.useInfiniteQuery(
    { search: q, limit: albumsLimit },
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

  const shouldObserve = (index: number) =>
    albumsData?.pages.at(-1)?.albums.length === albumsLimit &&
    index === albums.length - 1;

  return (
    <>
      {albums.map(({ id, name, album_image_rels: images }, index) => (
        <Tile
          key={id}
          ref={shouldObserve(index) ? albumsRef : null}
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
