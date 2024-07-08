import type { NextPage } from "next";
import Head from "next/head";
import AlbumsBlock from "../../components/AlbumsBlock";

const Albums: NextPage = () => (
  <>
    <Head>
      <title>Albums</title>
    </Head>
    <AlbumsBlock />
  </>
);

export default Albums;
