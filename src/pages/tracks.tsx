import { NextPage } from "next";
import Head from "next/head";
import TracksBlock from "../components/TracksBlock";

const Tracks: NextPage<{
  playableTracks: number[];
  currentTrack?: number;
  setCurrentTrack: Function;
}> = ({ playableTracks, currentTrack, setCurrentTrack }) => {
  return (
    <>
      <Head>
        <title>Tracks</title>
      </Head>
      <TracksBlock
        playableTracks={playableTracks}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
    </>
  );
};

export default Tracks;
