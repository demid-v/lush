import "../styles/artist.css";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { transformArtistAlbums } from "../utils/functions";
import { TGroupedArtistAlbum } from "../utils/types";
import vynilIcon from "../assets/icons/vynil.svg";
import { DOMAIN_MID_PATH } from "../utils/globals";
import TracksBlock from "../components/TracksBlock";

function Artist({
  mode,
  checkMode,
  setLightMode,
  color,
  setColor,
  playableTracks,
  currentTrack,
  setCurrentTrack,
}: {
  mode: "light" | "dark";
  checkMode: Function;
  setLightMode: Function;
  color?: { r: number; g: number; b: number };
  setColor: Function;
  playableTracks: number[];
  currentTrack?: number;
  setCurrentTrack: Function;
}) {
  const { artist } = useParams();
  const [artistId, setArtistId] = useState<string>();

  const [artistName, setArtistName] = useState();
  const [artistImage, setArtistImage] = useState<string>();
  const [albums, setAlbums] = useState<TGroupedArtistAlbum[]>([]);

  async function getArtist(signal?: AbortSignal) {
    const response = await fetch(
      `http://localhost:5500/artist?artistId=${artistId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      }
    );
    const data = await response.json();

    return data.artist;
  }

  async function getArtistAlbums(signal?: AbortSignal) {
    const response = await fetch(
      `http://localhost:5500/artistAlbums?artistId=${artistId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      }
    );
    const data = await response.json();

    const albums = transformArtistAlbums(data.albums[0]);

    return albums;
  }

  function checkArtistImage(
    domain_id: number,
    domain_name: string,
    image_id: string
  ) {
    if (domain_id !== null && domain_name !== null && image_id !== null) {
      setArtistImage(
        `${domain_name}/${
          DOMAIN_MID_PATH[domain_id as keyof typeof DOMAIN_MID_PATH]
        }${image_id}`
      );
    } else {
      setArtistImage("");
    }
  }

  useEffect(() => {
    let idEndIndex = artist?.indexOf("+");
    if (idEndIndex === -1) {
      idEndIndex = artist?.length;
    }
    setArtistId(artist?.substring(0, idEndIndex));
  }, [artist]);

  useEffect(() => {
    let artistAbortController: null | AbortController;
    let tracksAbortController: null | AbortController;
    let albumsAbortController: null | AbortController;

    if (artistId != null) {
      artistAbortController = new AbortController();
      tracksAbortController = new AbortController();
      albumsAbortController = new AbortController();

      getArtist(artistAbortController.signal)
        .then(({ name, domain_id, domain_name, image_id, r, g, b }) => {
          setArtistName(name);
          setColor({ r, g, b });
          checkMode(r, g, b);
          checkArtistImage(domain_id, domain_name, image_id);
        })
        .finally(() => (artistAbortController = null));

      getArtistAlbums(albumsAbortController.signal)
        .then(setAlbums)
        .finally(() => (albumsAbortController = null));
    }

    return function cleanup() {
      artistAbortController?.abort();
      tracksAbortController?.abort();
      albumsAbortController?.abort();

      setColor();
      setLightMode();
    };
  }, [artistId]);

  return (
    <main>
      <div>
        <div className="artist-info">
          <div
            className="artist-background"
            style={{
              background: `linear-gradient(rgba(${color?.r}, ${color?.g}, ${color?.b}, 1), rgba(${color?.r}, ${color?.g}, ${color?.b}, 0))`,
            }}
          ></div>
          <div className="artist-container">
            <div
              className="artist-image-wrapper"
              style={{ backgroundImage: `url(${artistImage})` }}
            ></div>
            <div className="artist-overlay">
              <div
                className={
                  "artist-name" + (mode === "dark" ? " artist-name_light" : "")
                }
              >
                {artistName}
              </div>
              <button className="artist-play-button">
                <div className="artist-content">
                  <div className="arrow-play-artist"></div>
                  <div className="text-play-artist">Play artist</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="artist__albums">
          <ol className="artist__albums-list">
            {albums.map(({ id, title, domain_id, domain_name, image_id }) => {
              let cover;

              if (
                domain_id !== null &&
                domain_name !== null &&
                image_id !== null
              ) {
                cover = `${domain_name}/${
                  DOMAIN_MID_PATH[domain_id as keyof typeof DOMAIN_MID_PATH]
                }${domain_id === 2 ? "300x300/" : ""}${image_id}`;
              } else {
                cover = vynilIcon;
              }

              return (
                <li key={id} className="tile artist__album">
                  <div className="artist__album-container">
                    <a href="/albums" className="tile__link">
                      <picture className={"tile__image-wrapper"}>
                        {cover && (
                          <img
                            className={
                              "tile__image" +
                              (cover === vynilIcon
                                ? " tile__image_no-cover"
                                : "")
                            }
                            src={cover}
                            alt={"Image of" + title}
                          />
                        )}
                      </picture>
                    </a>
                    <div className="artist__title">{title}</div>
                    <div className="artist__artists">
                      <div className="artist__artist-name"></div>
                    </div>
                    <div className="artist__tracks-count"></div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <TracksBlock
        playableTracks={playableTracks}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        queryParams={{ artistId }}
      />
    </main>
  );
}

export default Artist;
