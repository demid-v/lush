import "./styles/base.css";

import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Music from "./pages/Music";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Artist from "./pages/Artist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/music" element={<Music />}></Route>
          <Route path="/artists" element={<Artists />}></Route>
          <Route path="/artists/:artist" element={<Artist />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
        </Routes>
      </BrowserRouter>
      <div className="youtube-video hidden"></div>
    </>
  );
}

export default App;
