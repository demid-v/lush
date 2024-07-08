import ContainerLayout from "../layouts/ContainerLayout";
import { trpc } from "../utils/trpc";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useRouter } from "next/router";
import { joinParam } from "../utils";
import { useMemo } from "react";

const defaultImage = "/assets/playlist.png";

const PlaylistsBlock = () => {
  const search = joinParam(useRouter().query.q);

  const { isLoading, data: playlistsData } =
    trpc.playlists.getPlaylists.useInfiniteQuery(
      { search },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const playlists = useMemo(
    () => playlistsData?.pages.flatMap((page) => page.playlists) ?? [],
    [playlistsData?.pages]
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
