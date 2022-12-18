import ContainerLayout from "../layouts/ContainerLayout";
import { type PlaylistsData, trpc } from "../utils/trpc";
import PlaylistTile from "./PlaylistTile";
import { useContent } from "../utils/hooks";

const PlaylistsBlock = () => {
  const playlists = useContent(
    trpc.playlists.getPlaylists,
    120
  ) as any as PlaylistsData;

  return (
    <ContainerLayout>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 gap-y-10">
        {playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </ul>
    </ContainerLayout>
  );
};

export default PlaylistsBlock;
