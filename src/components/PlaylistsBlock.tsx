import ContainerLayout from "../layouts/ContainerLayout";
import type { PlaylistsData } from "../utils/types";
import { trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";

const PlaylistsBlock = () => {
  const { content } = useContent(trpc.playlists.getPlaylists, 120);

  const playlists = content as PlaylistsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {playlists.map(({ id, name, playlist_image_rel: images }) => (
          <Tile
            key={id}
            data={{
              id,
              domain: "playlists",
              name,
              image: images[0]?.playlist_image,
              defaultImage: "/assets/playlist.png",
            }}
          />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default PlaylistsBlock;
