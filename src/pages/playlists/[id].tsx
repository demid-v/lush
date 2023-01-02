import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import PlaylistHeader from "../../components/PlaylistHeader";
import TracksBlock from "../../components/TracksBlock";

const Playlist: NextPage = () => {
  const { id } = useRouter().query;

  const [pageTitle, setPageTitle] = useState("Playlist");

  const playlistId = (() => {
    let playlistId = Array.isArray(id) ? id.join("") : id;
    playlistId = playlistId?.split(/\+(.*)/s)[0];
    return typeof playlistId === "string" ? Number(playlistId) : playlistId;
  })();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <PlaylistHeader playlistId={playlistId} setPageTitle={setPageTitle} />
        <TracksBlock params={{ playlistId }} />
      </div>
    </>
  );
};

export default Playlist;
