import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import type { TracksData } from "../utils/trpc";
import type { ActiveTrack } from "../utils/types";

const TracksContext = createContext<{
  setGlobalTracks: (tracks: TracksData) => void;
  globalPlayableTracks: Map<number, ActiveTrack>;
  activeTrack: ActiveTrack | null;
  setActiveTrack: Dispatch<SetStateAction<ActiveTrack | null>>;
} | null>(null);

const Tracks: FC<{ children: ReactNode }> = ({ children }) => {
  const globalTracks = useRef<TracksData>([]);
  const globalPlayableTracks = useRef<Map<number, ActiveTrack>>(new Map());

  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);

  function setGlobalTracks(tracks: TracksData) {
    globalTracks.current.length = 0;

    tracks.forEach((track) => {
      globalTracks.current.push(track);

      const { id, youtube_video_id } = track;

      if (youtube_video_id !== null) {
        globalPlayableTracks.current.set(id, { id, youtube_video_id });
      }
    });
  }

  useEffect(() => console.log(activeTrack), [activeTrack]);

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
