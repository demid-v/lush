import { atom, useAtomValue, useSetAtom } from "jotai";

export const playableTracksAtom = atom<string[]>([]);

const baseActiveTrackAtom = atom<string | null>(null);
let hasNextPlayableTrack = true;

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

export const useNextActiveTrack = () => {
  const setActiveTrack = useSetAtom(activeTrackAtom);
  const nextPlayableTrack = useAtomValue(nextPlayableTrackAtom);

  const setNextActiveTrack = () => {
    if (!hasNextPlayableTrack || nextPlayableTrack === null) return;

    setActiveTrack(nextPlayableTrack);
  };

  return { setNextActiveTrack };
};

export const trackYoutubeUrlAtom = atom(
  (get) => `https://www.youtube.com/watch?v=${get(activeTrackAtom)}`,
);

export const isTrackPlayingAtom = atom(true);
