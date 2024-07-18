import PageHeader from "~/components/PageHeader";
import TracksBlock from "~/components/TracksBlock";
import { api } from "~/trpc/server";
import { extractIdFromQuery, joinParam } from "~/utils";

const Playlist = async ({
  params: { playlist },
  searchParams,
}: {
  params: { playlist: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const playlistId = extractIdFromQuery(playlist);
  const { q } = searchParams ?? {};

  const data = await api.playlist.page({
    ...(q && { search: joinParam(q) }),
    playlistId,
  });

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
