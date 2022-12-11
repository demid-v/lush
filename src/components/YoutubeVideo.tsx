import { useCallback, useEffect, useRef, useState } from "react";
import { useTracks } from "../contexts/Tracks";
import type { YoutubePlayerEvent } from "../utils/types";

const YoutubeVideo = () => {
  const { activeTrack, setNextActiveTrack } = useTracks();

  const [playerState, setPlayerState] = useState<string>("idle");

  const activeTrackYoutubeVideoId = useRef<string | null>(null);

  const onPlayerStateChange = useCallback((event: YoutubePlayerEvent) => {
    if (event.data == window.YT.PlayerState.ENDED) {
      setPlayerState("ended");
    } else if (event.data == window.YT.PlayerState.PLAYING) {
      setPlayerState("playing");
    }
  }, []);

  useEffect(() => {
    if (playerState === "ended") {
      setNextActiveTrack();
    }
  }, [playerState]);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = function () {
      window.player = new window.YT.Player("youtube-video", {
        height: "280",
        width: "500",
        origin,
        events: { onStateChange: onPlayerStateChange },
      });
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
  }, [onPlayerStateChange]);

  useEffect(() => {
    if (window.player && "loadVideoById" in window.player && activeTrack) {
      if (activeTrackYoutubeVideoId.current !== activeTrack.youtube_video_id) {
        window.player.loadVideoById(activeTrack.youtube_video_id);
      }

      if (
        window.player.getPlayerState() === window.YT.PlayerState.UNSTARTED ||
        window.player.getPlayerState() === window.YT.PlayerState.PAUSED
      ) {
        window.player.playVideo();
      } else if (
        window.player.getPlayerState() === window.YT.PlayerState.PLAYING
      ) {
        window.player.pauseVideo();
      }

      activeTrackYoutubeVideoId.current = activeTrack.youtube_video_id;
    }
  }, [activeTrack]);

  return (
    <div
      className={
        "fixed right-2 bottom-3.5 z-10" +
        (activeTrack === null ? " hidden" : "")
      }
    >
      <div id="youtube-video"></div>
    </div>
  );
};

export default YoutubeVideo;
