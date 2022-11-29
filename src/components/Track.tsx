import { FC, useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Link from "next/link";
import { TrackData } from "../utils/trpc";

const Track: FC<{
  track: TrackData;
  activeTrack: number | null;
  setActiveTrack?: Function;
  setGlobalTracks: Function;
  globalPlayableTracks: number[];
}> = ({
  track,
  activeTrack,
  setActiveTrack,
  setGlobalTracks,
  globalPlayableTracks,
}) => {
  const {
    title,
    duration,
    youtube_video_id,
    track_artist_rel: artists,
    track_genre_rel: genres,
    track_album_rel: albums,
  } = track;

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

  function playVideo() {
    if (window.player && "loadVideoById" in window.player) {
      window.player.h?.classList.remove("hidden");

      window.player.loadVideoById(youtube_video_id);
      window.player.playVideo();
    } else {
      setTimeout(playVideo, 1000);
    }
  }

  function onTrackClicked() {
    setActiveTrack?.(track.id);
  }

  useEffect(() => {
    if (activeTrack === track.id) {
      setPlaying(true);
      playVideo();
    } else {
      setPlaying(false);
    }
  }, [activeTrack]);

  return (
    <li className="track">
      <div className="track__container">
        <div className="track__main">
          <div
            className="track__clickable-background"
            onClick={onTrackClicked}
          ></div>

          <div className="track__left-side">
            <div
              className={
                "track__artist-image-wrapper" +
                (trackCover ? "" : " track__artist-image-wrapper_no-cover")
              }
              style={{ backgroundImage: trackCover }}
            ></div>
            <div className="track__play-button">
              <div className="track__white-circle track__play-button-element"></div>
              <div className="track__action-icon track__play-button-element"></div>
            </div>
          </div>

          <div className="track__content">
            <div className="track__header">
              <div className="track__title track__header-element">{title}</div>
              {artists?.map(({ artist }) => (
                <div
                  key={artist.id}
                  className="track__artists track__header-element"
                >
                  <Link
                    href={`/artists/${artist.id}+${constructLink(artist.name)}`}
                    className="track__artists-link"
                  >
                    {artist.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="track__hud">
              <div className="track__first-row">
                <div className="track__genres no-color">
                  {genres?.map(({ genre }) => (
                    <button
                      key={genre.id}
                      className="track__genre"
                      data-param={`${constructLink(genre.name)}`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
                <div className="track__right-tab">
                  <button className="track__right-tab-button track__edit-button"></button>
                </div>
              </div>

              <div className="track__second-row">
                <div className="track__time">
                  <div className={playing ? "" : "hidden"}>
                    <div className="track__curr-time-container">
                      <span className="track__curr-time">00:00</span>
                      <div className="track__time-slash">/</div>
                    </div>
                  </div>
                  <div className="track__duration-container">
                    <span className="track__duration">{parsedDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Track;
