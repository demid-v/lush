import Link from "next/link";
import { useTheme } from "../contexts/Theme";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={"header bg-header"}>
      <div className="header__logo">
        <Link
          href="/"
          className={
            "header__logo-link" +
            (theme === "dark" ? " header__logo-link_light" : "")
          }
        >
          Lush
        </Link>
      </div>
      <div className="header__current-track invisible">
        <div className="header__track-main">
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
      <div className="header__pages-container">
        <nav>
          <ul className="header__pages">
            <li>
              <Link
                href="/tracks"
                className={
                  "header__page-link" +
                  (theme === "dark" ? " header__page-link_light" : "")
                }
              >
                Tracks
              </Link>
            </li>
            <li>
              <Link
                href="/artists"
                className={
                  "header__page-link" +
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
                  "header__page-link" +
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
                  "header__page-link" +
                  (theme === "dark" ? " header__page-link_light" : "")
                }
              >
                Playlists
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
