import { useEffect, useRef } from "react";
import YouTube, { type YouTubeProps, type YouTubePlayer } from "react-youtube";
import { useTracks } from "../contexts/Tracks";
import type { ActiveTrack } from "../utils/types";

const YoutubePlayer = () => {
  const { activeTrack, setNextActiveTrack } = useTracks();

  const player = useRef<YouTube>(null);
  const internalPlayer = useRef<YouTubePlayer | null | undefined>(null);

  const prevActiveTrack = useRef<ActiveTrack>(null);

  const opts: YouTubeProps["opts"] = {
    height: "280",
    width: "500",
  };

  const onPlayerReady: YouTubeProps["onReady"] = () => {
    internalPlayer.current = player.current?.getInternalPlayer();
  };

  useEffect(() => {
    if (!activeTrack) return;

    internalPlayer.current
      ?.getPlayerState()
      .then((playerState) => {
        if (!internalPlayer.current) return;

        if (
          JSON.stringify(activeTrack) ===
          JSON.stringify(prevActiveTrack.current)
        ) {
          if (playerState === YouTube.PlayerState.PLAYING) {
            internalPlayer.current.pauseVideo();
          } else if (playerState === YouTube.PlayerState.PAUSED) {
            internalPlayer.current.playVideo();
          }
        } else {
          if (!internalPlayer.current) return;

          internalPlayer.current
            .loadVideoById(activeTrack.youtube_video_id)
            .then(() => internalPlayer.current?.playVideo())
            .catch((error) => console.error("Error in loadVideoById:", error));

          prevActiveTrack.current = activeTrack;
        }
      })
      .catch((error) => console.error("Error in getPlayerState:", error));
  }, [activeTrack]);

  return (
    <YouTube
      ref={player}
      opts={opts}
      onReady={onPlayerReady}
      onEnd={setNextActiveTrack}
      onError={setNextActiveTrack}
      className={
        "fixed right-2 bottom-3.5 z-20" +
        (activeTrack === null ? " hidden" : "")
      }
    />
  );
};

export default YoutubePlayer;
