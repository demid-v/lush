"use client";

import Tile from "./tile";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

const defaultImage = "/assets/note.svg";
const artistsLimit = 120;

const Artists = () => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const {
    data: artistsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.artist.page.useInfiniteQuery(
    { search: q, limit: artistsLimit },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const artists = useMemo(
    () => artistsData?.pages.flatMap((page) => page.artists) ?? [],
    [artistsData?.pages],
  );

  const { ref: artistsRef } = useInView({
    triggerOnce: true,
    onChange(inView) {
      if (!inView || isFetching || !hasNextPage) return;

      void fetchNextPage();
    },
  });

  const shouldObserve = (index: number) =>
    artistsData?.pages.at(-1)?.artists.length === artistsLimit &&
    index === artists.length - 1;

  return (
    <>
      {artists.map(({ id, name, artist_image_rels: images }, index) => (
        <Tile
          key={id}
          ref={shouldObserve(index) ? artistsRef : null}
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

export default Artists;
