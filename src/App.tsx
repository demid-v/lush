import "./styles/base.css";

import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Music from "./pages/Music";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Artist from "./pages/Artist";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const [color, setColor] = useState<{
    r: number;
    g: number;
    b: number;
  }>();

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

  return (
    <>
      <BrowserRouter>
        <Header mode={mode} color={color} />
        <Routes>
          <Route path="/music" element={<Music />}></Route>
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
              />
            }
          ></Route>
          <Route path="/albums" element={<Albums />}></Route>
        </Routes>
      </BrowserRouter>
      <div className="youtube-video hidden"></div>
    </>
  );
}

export default App;
