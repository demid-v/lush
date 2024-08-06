import { create } from "zustand";

type TracksStore = {
  playableTracks: string[];
  activeTrack: string | null;
  isTrackPlaying: boolean;
  setPlayableTracks: (playableTracks: string[]) => void;
  setActiveTrack: (activeTrack: string) => void;
  setIsTrackPlaying: (isTrackPlaying: boolean) => void;
};

export const useTracksStore = create<TracksStore>((set, get) => ({
  playableTracks: [],
  activeTrack: null,
  isTrackPlaying: true,
  setPlayableTracks: (playableTracks) => set({ playableTracks }),
  setActiveTrack: (activeTrack) => {
    const prevActiveTrack = get().activeTrack;
    set({ activeTrack });

    if (activeTrack !== prevActiveTrack) return;
    set({ isTrackPlaying: !get().isTrackPlaying });
  },
  setIsTrackPlaying: (isTrackPlaying) => set({ isTrackPlaying }),
}));

export const useNextPlayableTrack = () =>
  useTracksStore(({ activeTrack, playableTracks }) => {
    if (activeTrack === null) return null;

    const activeTrackIndex = playableTracks.indexOf(activeTrack);
    if (activeTrackIndex === -1) return null;

    const nextPlayableTrackIndex = activeTrackIndex + 1;
    return playableTracks.at(nextPlayableTrackIndex) ?? null;
  });

export const useTrackYoutubeUrl = () =>
  useTracksStore(
    (state) => `https://www.youtube.com/watch?v=${state.activeTrack}`,
  );
