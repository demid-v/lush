import "./styles/base.css";

import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Music from "./pages/Music";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Artist from "./pages/Artist";
import { useEffect, useRef, useState } from "react";
import { YoutubePlayerEvent } from "./utils/types";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const [color, setColor] = useState<{
    r: number;
    g: number;
    b: number;
  }>();

  const playableTracks = useRef<number[]>([]);
  const [currentTrack, setCurrentTrack] = useState<number>();
  const [playerState, setPlayerState] = useState<string>("idle");

  function calcBrightness(r: number, g: number, b: number) {
    return Math.round((r * 299 + g * 587 + b * 114) / 1000);
  }

  function checkMode(r: number, g: number, b: number) {
    if (r != null && g != null && b != null && calcBrightness(r, g, b) < 125) {
      setMode("dark");
    }
  }

  function setLightMode() {
    setMode("light");
  }

  function playNextTrack() {
    if (currentTrack != null) {
      const currentIndex = playableTracks.current.indexOf(currentTrack);
      setCurrentTrack(playableTracks.current[currentIndex + 1]);
    }
  }

  function onPlayerStateChange(event: YoutubePlayerEvent) {
    if (event.data == window.YT.PlayerState.ENDED) {
      setPlayerState("ended");
    } else if (event.data == window.YT.PlayerState.PLAYING) {
      setPlayerState("playing");
    }
  }

  useEffect(() => {
    if (playerState === "ended") {
      playNextTrack();
    }
  }, [playerState]);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = function () {
      window.player = new window.YT.Player("youtube-video", {
        height: "280",
        width: "500",
        origin,
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  return (
    <BrowserRouter>
      <Header mode={mode} color={color} />
      <Routes>
        <Route
          path="/music"
          element={
            <Music
              playableTracks={playableTracks.current}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
            />
          }
        ></Route>
        <Route path="/artists" element={<Artists />}></Route>
        <Route
          path="/artists/:artist"
          element={
            <Artist
              mode={mode}
              checkMode={checkMode}
              setLightMode={setLightMode}
              color={color}
              setColor={setColor}
              playableTracks={playableTracks.current}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
            />
          }
        ></Route>
        <Route path="/albums" element={<Albums />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
