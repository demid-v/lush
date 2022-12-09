import type { FC, ReactNode } from "react";
import Header from "../components/Header";
import Theme from "../contexts/Theme";

const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Theme>
      <Header />
    </Theme>
    <main className="pt-10">{children}</main>
    <div id="youtube-video" className="youtube-video hidden"></div>
  </>
);

export default Main;
