import { type ReactNode } from "react";
import "../styles/globals.css";
import Header from "../components/header";
import Tracks from "../contexts/tracks";
import { TRPCReactProvider } from "~/trpc/react";
import { Quicksand } from "next/font/google";
import dynamic from "next/dynamic";

const quicksand = Quicksand({
  subsets: ["latin"],
});

const YoutubePlayer = dynamic(() => import("../components/youtube-player"), {
  ssr: false,
});

export const metadata = {
  title: "Lush",
  description: "Music website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${quicksand.className}`}>
        <TRPCReactProvider>
          <Tracks>
            <Header />
            <main className="z-10 pt-10">{children}</main>
            <YoutubePlayer />
          </Tracks>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
