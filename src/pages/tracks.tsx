import type { NextPage } from "next";
import Head from "next/head";
import TracksBlock from "../components/TracksBlock";

const Tracks: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tracks</title>
      </Head>
      <TracksBlock />
    </>
  );
};

export default Tracks;
