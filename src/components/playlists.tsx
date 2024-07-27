"use client";

import Tile from "./tile";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useInView } from "react-intersection-observer";

const defaultImage = "/assets/playlist.png";

const PlaylistsBlock = () => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const {
    data: playlistsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.playlist.page.useInfiniteQuery(
    { search: q, limit: 120 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const playlists = useMemo(
    () => playlistsData?.pages.flatMap((page) => page.playlists) ?? [],
    [playlistsData?.pages],
  );

  const { ref: playlistsRef } = useInView({
    triggerOnce: true,
    onChange(inView) {
      if (!inView || isFetching || !hasNextPage) return;

      void fetchNextPage();
    },
  });

  return (
    <>
      {playlists.map(({ id, name, playlist_image_rels: images }, index) => (
        <Tile
          key={id}
          ref={index === playlists.length - 1 ? playlistsRef : null}
          data={{
            id,
            domain: "playlists",
            name,
            image: images[0]?.playlist_image,
            defaultImage,
          }}
        />
      ))}
    </>
  );
};

export default PlaylistsBlock;
