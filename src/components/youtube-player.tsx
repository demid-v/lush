"use client";

import { useAtom, useAtomValue } from "jotai";
import { useRef } from "react";
import ReactPlayer from "react-player/youtube";
import type YouTubePlayer from "react-player/youtube";
import { useNextActiveTrack } from "~/utils/hooks";
import {
  activeTrackAtom,
  isTrackPlayingAtom,
  trackYoutubeUrlAtom,
} from "~/utils/state";

const YoutubePlayer = () => {
  const activeTrack = useAtomValue(activeTrackAtom);

  const { setNextActiveTrack } = useNextActiveTrack();

  const player = useRef<YouTubePlayer>(null);

  const url = useAtomValue(trackYoutubeUrlAtom);
  const [isTrackPlaying, setIsTrackPlayingAtom] = useAtom(isTrackPlayingAtom);

  const playTrack = () => setIsTrackPlayingAtom(true);
  const pauseTrack = () => setIsTrackPlayingAtom(false);

  return (
    <ReactPlayer
      ref={player}
      url={url}
      playing={isTrackPlaying}
      controls={true}
      width={500}
      height={280}
      playsinline={false}
      onReady={playTrack}
      onPlay={playTrack}
      onPause={pauseTrack}
      onEnded={setNextActiveTrack}
      onError={setNextActiveTrack}
      className={
        "fixed bottom-3.5 right-2 z-20" +
        (activeTrack === null ? " hidden" : "")
      }
    />
  );
};

export default YoutubePlayer;
