import type { NextPage } from "next";
import Head from "next/head";
import PlaylistsBlock from "../../components/PlaylistsBlock";

const Playlists: NextPage = () => (
  <>
    <Head>
      <title>Playlists</title>
    </Head>
    <PlaylistsBlock />
  </>
);

export default Playlists;
