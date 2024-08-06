"use client";

import { useRef } from "react";
import ReactPlayer from "react-player/youtube";
import type YouTubePlayer from "react-player/youtube";
import { useNextActiveTrack } from "~/utils/hooks";
import { useTracksStore, useTrackYoutubeUrl } from "~/utils/state";

const YoutubePlayer = () => {
  const activeTrack = useTracksStore((store) => store.activeTrack);

  const { setNextActiveTrack } = useNextActiveTrack();

  const player = useRef<YouTubePlayer>(null);

  const url = useTrackYoutubeUrl();
  const isTrackPlaying = useTracksStore((store) => store.isTrackPlaying);
  const setIsTrackPlayingAtom = useTracksStore(
    (store) => store.setIsTrackPlaying,
  );

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
