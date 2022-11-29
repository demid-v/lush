import Head from "next/head";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { TracksData } from "../utils/trpc";

const TracksContext = createContext<{
  setGlobalTracks: (tracks: TracksData) => void;
  globalPlayableTracks: number[];
  activeTrack: number | null;
  setActiveTrack: Function;
} | null>(null);

const Tracks: FC<{ children: ReactNode }> = ({ children }) => {
  const globalTracks = useRef<TracksData>([]);
  const globalPlayableTracks = useRef<number[]>([]);

  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  function setGlobalTracks(tracks: TracksData) {
    globalTracks.current.length = 0;

    tracks.forEach((track) => {
      globalTracks.current.push(track);

      if (track.youtube_video_id !== null) {
        globalPlayableTracks.current.push(track.id);
      }
    });
  }

  return (
    <TracksContext.Provider
      value={{
        setGlobalTracks,
        globalPlayableTracks: globalPlayableTracks.current,
        activeTrack,
        setActiveTrack,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};

function useTracks() {
  const context = useContext(TracksContext);

  if (!context) {
    throw new Error("useTracks must be used inside a `TracksContext`");
  }

  return context;
}

export default Tracks;
export { useTracks };
