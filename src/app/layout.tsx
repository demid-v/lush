import { Suspense, type ReactNode } from "react";
import "../styles/globals.css";
import Header from "../components/Header";
import Theme from "../contexts/Theme";
import Tracks from "../contexts/Tracks";
import YoutubePlayer from "../components/YoutubePlayer";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Lush",
  description: "Music website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <Tracks>
            <Theme>
              <Suspense>
                <Header />
              </Suspense>
              <main className="z-10 pt-10">
                <div className="mx-auto box-content max-w-[95rem] px-20 pb-2">
                  {children}
                </div>
              </main>
            </Theme>
            <YoutubePlayer />
          </Tracks>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
