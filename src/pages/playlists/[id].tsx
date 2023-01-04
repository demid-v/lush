import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import TracksBlock from "../../components/TracksBlock";
import PageHeader from "../../components/PageHeader";
import { trpc } from "../../utils/trpc";

const Playlist: NextPage = () => {
  const { id } = useRouter().query;

  const [pageTitle, setPageTitle] = useState("Playlist");

  const playlistId = (() => {
    let playlistId = Array.isArray(id) ? id.join("") : id;
    playlistId = playlistId?.split(/\+(.*)/s)[0];
    return typeof playlistId === "string" ? Number(playlistId) : playlistId;
  })();

  const { data } = trpc.playlists.getPlaylists.useQuery(
    {
      playlistId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, playlist_image_rel: images } = data?.[0] ?? {};
  const image = images?.[0]?.playlist_image;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <PageHeader name={name} image={image} setPageTitle={setPageTitle} />;
        <TracksBlock params={{ playlistId }} />
      </div>
    </>
  );
};

export default Playlist;
