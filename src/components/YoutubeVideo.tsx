import { useEffect } from "react";
import { useTracks } from "../contexts/Tracks";

const YoutubeVideo = () => {
  const { activeTrack } = useTracks();

  useEffect(() => {
    window.onYouTubeIframeAPIReady = function () {
      window.player = new window.YT.Player("youtube-video", {
        height: "280",
        width: "500",
        origin,
      });
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  useEffect(() => {
    if (window.player && "loadVideoById" in window.player && activeTrack) {
      window.player.loadVideoById(activeTrack.youtube_video_id);
      window.player.playVideo();
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
