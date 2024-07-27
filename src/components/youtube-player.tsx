"use client";

import { useEffect, useRef, useState } from "react";
import { useTracks } from "../contexts/tracks";
import type { ActiveTrack } from "../utils/types";
import ReactPlayer from "react-player/youtube";
import type YouTubePlayer from "react-player/youtube";

const youtubeLink = "https://www.youtube.com/watch?v=";

const YoutubePlayer = () => {
  const { activeTrack, setNextActiveTrack } = useTracks();

  const prevActiveTrack = useRef<ActiveTrack | null>(null);

  const player = useRef<YouTubePlayer>(null);

  const [url, setUrl] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = () => setIsPlaying(true);
  const pauseTrack = () => setIsPlaying(false);

  useEffect(() => {
    if (!activeTrack) return;

    const isSameTrack =
      JSON.stringify(activeTrack) === JSON.stringify(prevActiveTrack.current);

    if (isSameTrack) {
      setIsPlaying((prevState) => !prevState);
      return;
    }

    setUrl(`${youtubeLink}${activeTrack.youtube_video_id}`);
    playTrack();

    prevActiveTrack.current = activeTrack;
  }, [activeTrack]);

  return (
    <ReactPlayer
      ref={player}
      url={url}
      playing={isPlaying}
      controls={true}
      width={500}
      height={280}
      playsinline={false}
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
