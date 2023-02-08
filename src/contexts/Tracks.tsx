import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import type { ActiveTrack, TracksData } from "../utils/types";

const TracksContext = createContext<{
  activeTrack: ActiveTrack;
  setActiveTrack: Dispatch<SetStateAction<ActiveTrack>>;
  setNextActiveTrack: () => void;
  setGlobalTracks: (tracks: TracksData) => void;
  globalPlayableTracks: NonNullable<ActiveTrack>[];
} | null>(null);

const Tracks: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);

  const globalTracks = useRef<TracksData>([]);
  const globalPlayableTracks = useRef<NonNullable<ActiveTrack>[]>([]);

  function setGlobalTracks(tracks: TracksData) {
    globalTracks.current.length = 0;

    tracks.forEach((track) => {
      globalTracks.current.push(track);

      const { id, youtube_video_id } = track;

      if (youtube_video_id !== null) {
        globalPlayableTracks.current.push({ id, youtube_video_id });
      }
    });
  }

  function setNextActiveTrack() {
    const activeTrackIndex = globalPlayableTracks.current.findIndex(
      (tracks) => tracks.id === activeTrack?.id
    );

    if (activeTrackIndex === -1) return;

    const nextActiveTrack = globalPlayableTracks.current[activeTrackIndex + 1];

    if (!nextActiveTrack) return;

    setActiveTrack(nextActiveTrack);
  }

  return (
    <TracksContext.Provider
      value={{
        activeTrack,
        setActiveTrack,
        setNextActiveTrack,
        setGlobalTracks,
        globalPlayableTracks: globalPlayableTracks.current,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};

function useTracks() {
  const context = useContext(TracksContext);

  if (!context) {
    throw new Error("useTracks must be used inside a TracksContext");
  }

  return context;
}

export default Tracks;
export { useTracks };
