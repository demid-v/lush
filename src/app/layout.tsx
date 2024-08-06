import Header from "../components/header";
import "../styles/globals.css";
import { Provider as JotaiProvider } from "jotai";
import dynamic from "next/dynamic";
import { Quicksand } from "next/font/google";
import { type ReactNode } from "react";
import { TRPCReactProvider } from "~/trpc/react";

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
          <JotaiProvider>
            <Header />
            <main className="z-10 pt-10">{children}</main>
            <YoutubePlayer />
          </JotaiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
