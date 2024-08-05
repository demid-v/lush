import { useSetAtom, useAtomValue, useAtom } from "jotai";
import {
  activeTrackAtom,
  isTrackPlayingAtom,
  nextPlayableTrackAtom,
  themeAtom,
} from "./state";

export const useNextActiveTrack = () => {
  const setActiveTrack = useSetAtom(activeTrackAtom);
  const nextPlayableTrack = useAtomValue(nextPlayableTrackAtom);
  const setIsTrackPlaying = useSetAtom(isTrackPlayingAtom);

  const setNextActiveTrack = () => {
    if (nextPlayableTrack === null) {
      setIsTrackPlaying(false);
      return;
    }

    setActiveTrack(nextPlayableTrack);
  };

  return { setNextActiveTrack };
};

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const brightness = (r: number, g: number, b: number) =>
    Math.round((r * 299 + g * 587 + b * 114) / 1000);

  const setColor = (r: number, g: number, b: number) => {
    document
      .querySelector<HTMLElement>(":root")
      ?.style.setProperty("--background", `${r} ${g} ${b}`);

    setTheme(brightness(r, g, b) < 125 ? "dark" : "light");
  };

  return { theme, setColor };
};
