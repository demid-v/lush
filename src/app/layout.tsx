import { type ReactNode } from "react";
import "../styles/globals.css";
import Header from "../components/header";
import { TRPCReactProvider } from "~/trpc/react";
import { Quicksand } from "next/font/google";
import dynamic from "next/dynamic";
import { Provider as JotaiProvider } from 'jotai'

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
