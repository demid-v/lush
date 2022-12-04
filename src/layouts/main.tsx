import type { FC, ReactNode } from "react";
import Header from "../components/Header";
import Theme from "../contexts/Theme";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Theme>
        <Header />
      </Theme>
      <main className="pt-10">{children}</main>
      <div id="youtube-video" className="youtube-video hidden"></div>
    </>
  );
};

export default MainLayout;
