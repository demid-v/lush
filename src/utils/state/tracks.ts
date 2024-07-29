import { atom } from "jotai";

export const playableTracksAtom = atom<string[]>([]);

const baseActiveTrackAtom = atom<string | null>(null);
export let hasNextPlayableTrack = true;

export const activeTrackAtom = atom(
  (get) => get(baseActiveTrackAtom),
  (get, set, newValue: string | undefined) => {
    if (newValue === undefined) return;

    const prevActiveTrack = get(activeTrackAtom);
    set(baseActiveTrackAtom, newValue);

    if (newValue === prevActiveTrack) {
      set(isTrackPlayingAtom, !get(isTrackPlayingAtom));
    }

    const playableTracksValue = get(playableTracksAtom);

    const nextIndex = playableTracksValue.indexOf(newValue) + 1;

    if (nextIndex > playableTracksValue.length - 1) {
      hasNextPlayableTrack = false;
      return;
    }

    set(nextPlayableTrackAtom, playableTracksValue[nextIndex] ?? null);
  },
);

export const nextPlayableTrackAtom = atom<string | null>(null);

export const trackYoutubeUrlAtom = atom(
  (get) => `https://www.youtube.com/watch?v=${get(activeTrackAtom)}`,
);

export const isTrackPlayingAtom = atom(true);
