import TracksBlock from "../components/TracksBlock";

function Music({
  playableTracks,
  currentTrack,
  setCurrentTrack,
}: {
  playableTracks: number[];
  currentTrack?: number;
  setCurrentTrack: Function;
}) {
  return (
    <TracksBlock
      playableTracks={playableTracks}
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack}
    />
  );
}

export default Music;
