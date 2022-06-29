import "../styles/header.css";

import { Link } from "react-router-dom";

function Header({
  mode,
  color,
}: {
  mode: "light" | "dark";
  color?: { r: number; g: number; b: number };
}) {
  return (
    <header
      className="header"
      style={{
        background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : "",
      }}
    >
      <div className="header__logo">
        <Link
          to="/"
          className={
            "header__logo-link" +
            (mode === "dark" ? " header__logo-link_light" : "")
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
        <ul className="header__pages">
          <Link
            to="/music"
            className={
              "header__page-link" +
              (mode === "dark" ? " header__page-link_light" : "")
            }
          >
            Music
          </Link>
          <Link
            to="/artists"
            className={
              "header__page-link" +
              (mode === "dark" ? " header__page-link_light" : "")
            }
          >
            Artists
          </Link>
          <Link
            to="/albums"
            className={
              "header__page-link" +
              (mode === "dark" ? " header__page-link_light" : "")
            }
          >
            Albums
          </Link>
          <Link
            to="/playlists"
            className={
              "header__page-link" +
              (mode === "dark" ? " header__page-link_light" : "")
            }
          >
            Playlists
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
