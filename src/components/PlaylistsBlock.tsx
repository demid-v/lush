import ContainerLayout from "../layouts/ContainerLayout";
import { trpc } from "../utils/trpc";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useRouter } from "next/router";
import { joinParam } from "../utils";

const defaultImage = "/assets/playlist.png";

const PlaylistsBlock = () => {
  const search = joinParam(useRouter().query.q);

  const { isLoading, data: playlists } = trpc.playlists.getPlaylists.useQuery({
    search,
  });

  if (playlists === undefined) return null;

  return (
    <ContainerLayout
      contentLength={playlists.length}
      isLoading={isLoading}
      isTiled={true}
      image={defaultImage}
    >
      <GridLayout>
        {playlists.map(({ id, name, playlist_image_rel: images }) => (
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
