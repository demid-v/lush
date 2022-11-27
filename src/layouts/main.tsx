import Head from "next/head";
import { FC, ReactNode } from "react";
import Header from "../components/Header";
import Theme from "../contexts/Theme";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Music website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900"
          rel="stylesheet"
        />
      </Head>
      <Theme>
        <Header />
      </Theme>
      <main>{children}</main>
      <div id="youtube-video" className="youtube-video hidden"></div>
    </>
  );
};

export default MainLayout;
