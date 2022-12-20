import YouTube, { type YouTubeProps } from "react-youtube";
import { useTracks } from "../contexts/Tracks";

const YoutubePlayer = () => {
  const { activeTrack, setNextActiveTrack } = useTracks();

  const opts: YouTubeProps["opts"] = {
    height: "280",
    width: "500",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
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
