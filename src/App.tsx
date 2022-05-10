import "./styles/base.css";

import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Music from "./pages/Music";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/music" element={<Music />}></Route>
        </Routes>
      </BrowserRouter>
      <div className="youtube-video hidden"></div>
    </>
  );
}

export default App;
