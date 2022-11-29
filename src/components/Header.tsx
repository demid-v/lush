import Link from "next/link";
import { useTheme } from "../contexts/Theme";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="fixed flex h-10 w-full items-center gap-x-12 bg-header px-[2.1875rem]">
      <Link
        href="/"
        className={
          "text-[1.4rem] italic leading-7 tracking-[0.7em]" +
          (theme === "dark" ? " text-white" : "")
        }
      >
        Lush
      </Link>
      <div className="invisible h-full flex-1">
        <div className="flex">
          <div className="header__buttons">
            <div className="header__buttons-container">
              <button className="header__prev-button header__button"></button>
              <button className="header__play-button header__button"></button>
              <button className="header__next-button header__button"></button>
            </div>
          </div>

          <div className="header__track-content">
            <div className="header__track-header-container">
              <div className="header__track-header">
                <div className="header__artists"></div>
                <div className="header__title"></div>
              </div>
            </div>
            <progress
              value="0"
              max="100"
              className="header__progress-bar"
            ></progress>
          </div>

          <div className="header__track-hud">
            <div className="header__right-tab">
              <button className="header__repeat"></button>
            </div>

            <div className="header__time">
              <div className="hidden">
                <div className="header__curr-time">
                  <span>00:00</span>
                </div>

                <div className="header__time-slash">/</div>
              </div>

              <div className="header__duration">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="text-[0.9rem] leading-none">
        <ul className="flex gap-[0.313rem]">
          <li>
            <Link
              href="/tracks"
              className={
                "px-header__link hover:underline" +
                (theme === "dark" ? " header__page-link_light" : "")
              }
            >
              Music
            </Link>
          </li>
          <li>
            <Link
              href="/artists"
              className={
                "px-header__link hover:underline" +
                (theme === "dark" ? " header__page-link_light" : "")
              }
            >
              Artists
            </Link>
          </li>
          <li>
            <Link
              href="/albums"
              className={
                "px-header__link hover:underline" +
                (theme === "dark" ? " header__page-link_light" : "")
              }
            >
              Albums
            </Link>
          </li>
          <li>
            <Link
              href="/playlists"
              className={
                "px-header__link hover:underline" +
                (theme === "dark" ? " header__page-link_light" : "")
              }
            >
              Playlists
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
