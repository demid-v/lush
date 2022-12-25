import ContainerLayout from "../layouts/ContainerLayout";
import { type PlaylistsData, trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";

const PlaylistsBlock = () => {
  const playlists = useContent(
    trpc.playlists.getPlaylists,
    120
  ) as PlaylistsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {playlists.map(({ id, name, playlist_image_rel: images }) => (
          <Tile
            key={id}
            data={{
              id,
              dir: "artists",
              name,
              image: images[0]?.playlist_image,
              fallbackImage: "/assets/playlist.png",
            }}
          />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default PlaylistsBlock;
