import { useEffect, useRef } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import { useTracks } from "../contexts/Tracks";
import type { ActiveTrack } from "../utils/types";

const YoutubePlayer = () => {
  const { activeTrack, setNextActiveTrack } = useTracks();

  const player = useRef<YouTube>(null);

  const prevActiveTrack = useRef<ActiveTrack>(null);

  useEffect(() => {
    const internalPlayer = player.current?.getInternalPlayer();

    if (!internalPlayer) {
      return;
    }

    internalPlayer.getPlayerState().then((playerState: number) => {
      if (
        JSON.stringify(activeTrack) === JSON.stringify(prevActiveTrack.current)
      ) {
        if (playerState === YouTube.PlayerState.PLAYING) {
          internalPlayer.pauseVideo();
        } else if (playerState === YouTube.PlayerState.PAUSED) {
          internalPlayer.playVideo();
        }
      } else {
        prevActiveTrack.current = activeTrack;
      }
    });
  }, [activeTrack]);

  const opts: YouTubeProps["opts"] = {
    height: "280",
    width: "500",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      ref={player}
      videoId={activeTrack?.youtube_video_id}
      opts={opts}
      onEnd={setNextActiveTrack}
      onError={setNextActiveTrack}
      className={
        "fixed right-2 bottom-3.5 z-10" +
        (activeTrack === null ? " hidden" : "")
      }
    />
  );
};

export default YoutubePlayer;
