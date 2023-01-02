import type { Dispatch, FC, SetStateAction } from "react";
import { trpc } from "../utils/trpc";
import PageHeader from "./PageHeader";

const PlaylistHeader: FC<{
  playlistId: number | undefined;
  setPageTitle: Dispatch<SetStateAction<string>>;
}> = ({ playlistId, setPageTitle }) => {
  const { data } = trpc.playlists.getPlaylists.useQuery(
    {
      playlistId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, playlist_image_rel: images } = data?.[0] ?? {};
  const image = images?.[0]?.playlist_image;

  return <PageHeader name={name} image={image} setPageTitle={setPageTitle} />;
};

export default PlaylistHeader;
