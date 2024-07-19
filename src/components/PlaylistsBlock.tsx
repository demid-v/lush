"use client";

import Tile from "./Tile";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

const defaultImage = "/assets/playlist.png";

const PlaylistsBlock = () => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const { data: playlistsData } = api.playlist.page.useInfiniteQuery(
    { search: q, limit: 120 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const playlists = useMemo(
    () => playlistsData?.pages.flatMap((page) => page.playlists) ?? [],
    [playlistsData?.pages],
  );

  return (
    <>
      {playlists.map(({ id, name, playlist_image_rels: images }) => (
        <Tile
          key={id}
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
