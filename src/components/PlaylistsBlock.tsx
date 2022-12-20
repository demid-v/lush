import ContainerLayout from "../layouts/ContainerLayout";
import { type PlaylistsData, trpc } from "../utils/trpc";
import PlaylistTile from "./PlaylistTile";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";

const PlaylistsBlock = () => {
  const playlists = useContent(
    trpc.playlists.getPlaylists,
    120
  ) as never as PlaylistsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default PlaylistsBlock;
