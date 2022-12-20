import type { FC, ReactNode } from "react";
import Header from "../components/Header";
import YoutubePlayer from "../components/YoutubePlayer";
import Theme from "../contexts/Theme";
import Tracks from "../contexts/Tracks";

const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <Tracks>
    <Theme>
      <Header />
      <main className="pt-10">{children}</main>
    </Theme>

    <YoutubePlayer />
  </Tracks>
);

export default Main;
