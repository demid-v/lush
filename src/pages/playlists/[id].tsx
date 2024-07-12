import { useRouter } from "next/router";
import type { NextPage } from "next";
import TracksBlock from "../../components/TracksBlock";
import PageHeader from "../../components/PageHeader";
import { trpc } from "../../utils/trpc";
import { extractIdFromQuery } from "../../utils";

const Playlist: NextPage = () => {
  const playlistId = extractIdFromQuery(useRouter().query.id);

  const { data } = trpc.playlist.page.useQuery(
    {
      playlistId,
    },
    { refetchOnWindowFocus: false },
  );

  const { name, playlist_image_rels: images } = data?.playlists[0] ?? {};
  const image = images?.[0]?.playlist_image;

  return (
    <div>
      <PageHeader name={name} image={image} />
      <TracksBlock params={{ playlistId }} />
    </div>
  );
};

export default Playlist;
