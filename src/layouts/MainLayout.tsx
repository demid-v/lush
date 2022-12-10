import type { FC, ReactNode } from "react";
import Header from "../components/Header";
import YoutubeVideo from "../components/YoutubeVideo";
import Theme from "../contexts/Theme";
import Tracks from "../contexts/Tracks";

const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <Tracks>
    <Theme>
      <Header />
    </Theme>

    <main className="pt-10">{children}</main>

    <YoutubeVideo />
  </Tracks>
);

export default Main;
