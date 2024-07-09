import { type ReactNode } from "react";
import "../styles/globals.css";
import Header from "../components/Header";
import Theme from "../contexts/Theme";
import Tracks from "../contexts/Tracks";
import YoutubePlayer from "../components/YoutubePlayer";

export const metadata = {
  title: "Lush",
  description: "Music website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Tracks>
          <Theme>
            <Header />
            <main className="z-10 pt-10">{children}</main>
          </Theme>
          <YoutubePlayer />
        </Tracks>
      </body>
    </html>
  );
};

export default RootLayout;
