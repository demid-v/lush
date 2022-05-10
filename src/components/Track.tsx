import "../styles/track.css";

import { useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import { DOMAIN_MID_PATH } from "../utils/globals";
import type { TGroupedTrack } from "../utils/types";

function Track({ track }: { track: TGroupedTrack }) {
  const { albums, artists, title, duration, genres } = track;

  const [playing, setPlaying] = useState(false);

  const parsedDuration = (() => {
    const durationFloored: number = Math.floor(duration);
    const minutes: number = Math.floor(durationFloored / 60);
    const seconds: number = Math.floor(durationFloored - minutes * 60);

    var durationStr: string = "";
    if (minutes < 10) {
      durationStr += "0";
    }
    durationStr += minutes + ":";

    if (seconds < 10) {
      durationStr += "0";
    }
    durationStr += seconds;

    return durationStr;
  })();

  const [trackCover, setCover] = useState("");

  useEffect(() => {
    let domain_name: string | null = null,
      domain_id: number | null = null,
      image_id: string | null = null;

    if (albums !== undefined) {
      for (const album of Object.values(albums)) {
        if (album.domain_id) {
          domain_name = album.domain_name;
          domain_id = album.domain_id;
          image_id = album.image_id;
          break;
        }
      }
    }

    if (image_id === null && artists !== undefined) {
      for (const artist of artists) {
        if (artist.image_id) {
          domain_name = artist.domain_name;
          domain_id = artist.domain_id;
          image_id = artist.image_id;
        }
      }
    }

    if (domain_name !== null && domain_id !== null && image_id !== null) {
      setCover(
        `url("${domain_name}/${
          DOMAIN_MID_PATH[domain_id as keyof typeof DOMAIN_MID_PATH]
        }${domain_id === 2 ? "300x300/" : ""}${image_id}")`
      );
    }
  }, []);

  return (
    <li className="audio-li">
      <div className="audio-li__container">
        <div className="audio-li__main">
          <div className="audio-li__clickable-background"></div>

          <div className="audio-li__left-side">
            <div
              className={`audio-li__artist-image-wrapper ${
                trackCover && "audio-li__artist-image-wrapper_no-cover"
              }`}
              style={{ backgroundImage: trackCover }}
            ></div>
            <div className="audio-li__play-button">
              <div className="audio-li__white-circle audio-li__play-button-element"></div>
              <div className="audio-li__action-icon audio-li__play-button-element"></div>
            </div>
          </div>

          <div className="audio-li__content">
            <div className="audio-li__header">
              <div className="audio-li__title audio-li__header-element">
                {title}
              </div>
              {artists?.map((artist) => (
                <div
                  key={artist.id}
                  className="audio-li__artists audio-li__header-element"
                >
                  <a
                    href={`/artists/${artist.id}/${constructLink(artist.name)}`}
                    className="audio-li__artists-link"
                  >
                    {artist.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="audio-li__hud">
              <div className="audio-li__first-row">
                <div className="audio-li__genres no-color">
                  {genres?.map((genre) => (
                    <button
                      key={genre.id}
                      className="audio-li__genre"
                      data-param={`${constructLink(genre.name)}`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
                <div className="audio-li__right-tab">
                  <button className="audio-li__right-tab-button audio-li__edit-button"></button>
                </div>
              </div>

              <div className="audio-li__second-row">
                <div className="audio-li__time">
                  <div className={playing ? "" : "hidden"}>
                    <div className="audio-li__curr-time-container">
                      <span className="audio-li__curr-time">00:00</span>
                      <div className="audio-li__time-slash">/</div>
                    </div>
                  </div>
                  <div className="audio-li__duration-container">
                    <span className="audio-li__duration">{parsedDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Track;
