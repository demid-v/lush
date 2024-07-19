import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageHeader from "~/components/PageHeader";
import Tracks from "~/components/tracks";
import { api } from "~/trpc/server";
import { extractIdFromQuery } from "~/utils";

const PlaylistHeader = async ({
  params: { playlist },
}: {
  params: { playlist: string };
}) => {
  const playlistId = extractIdFromQuery(playlist);

  const data = await api.playlist.page({ playlistId });

  const { name, playlist_image_rels: images } = data?.playlists[0] ?? {};
  const image = images?.[0]?.playlist_image;

  return <PageHeader name={name} image={image} />;
};

const Playlist = async ({
  params: { playlist },
}: {
  params: { playlist: string };
}) => {
  const playlistId = extractIdFromQuery(playlist);

  if (Number.isNaN(playlistId)) return notFound();

  return (
    <div>
      <Suspense fallback={<PageHeader />}>
        <PlaylistHeader params={{ playlist }} />
      </Suspense>
      <Tracks params={{ playlistId }} />
    </div>
  );
};

export default Playlist;
