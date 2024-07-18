"use client";

import ContainerLayout from "../layouts/ContainerLayout";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

const defaultImage = "/assets/playlist.png";

const PlaylistsBlock = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q")?.toString();

  const { isLoading, data: playlistsData } = api.playlist.page.useInfiniteQuery(
    { search: queryParam },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const playlists = useMemo(
    () => playlistsData?.pages.flatMap((page) => page.playlists) ?? [],
    [playlistsData?.pages],
  );

  return (
    <ContainerLayout
      contentLength={playlists.length}
      isLoading={isLoading}
      isTiled={true}
      image={defaultImage}
    >
      <GridLayout>
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
      </GridLayout>
    </ContainerLayout>
  );
};

export default PlaylistsBlock;
