import { atom } from "jotai";

export const playableTracksAtom = atom<string[]>([]);

const baseActiveTrackAtom = atom<string | null>(null);

export const activeTrackAtom = atom(
  (get) => get(baseActiveTrackAtom),
  (get, set, newValue: string) => {
    const prevActiveTrack = get(activeTrackAtom);

    set(baseActiveTrackAtom, newValue);

    if (newValue !== prevActiveTrack) return;

    set(isTrackPlayingAtom, !get(isTrackPlayingAtom));
  },
);

export const nextPlayableTrackAtom = atom<string | null>((get) => {
  const activeTrack = get(activeTrackAtom);

  if (activeTrack === null) return null;

  const playableTracksValue = get(playableTracksAtom);
  const activeTrackIndex = playableTracksValue.indexOf(activeTrack);

  if (activeTrackIndex === -1) return null;

  const nextPlayableTrackIndex = activeTrackIndex + 1;

  return playableTracksValue.at(nextPlayableTrackIndex) ?? null;
});

export const trackYoutubeUrlAtom = atom(
  (get) => `https://www.youtube.com/watch?v=${get(activeTrackAtom)}`,
);

export const isTrackPlayingAtom = atom(true);
