import { NextPage } from "next";
import Head from "next/head";
import ArtistsBlock from "../components/ArtistsBlock";

const Artists: NextPage = () => {
  return (
    <>
      <Head>
        <title>Artists</title>
      </Head>
      <ArtistsBlock />
    </>
  );
};

export default Artists;
