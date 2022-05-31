import "../styles/artist.css";

import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import Track from "../components/Track";
import { transformArtistAlbums, transformTracks } from "../utils/functions";
import { TGroupedArtistAlbum, TGroupedTrack } from "../utils/types";
import vynilIcon from "../assets/icons/vynil.svg";
import { DOMAIN_MID_PATH } from "../utils/globals";

function Artist({
  mode,
  checkMode,
  setLightMode,
  color,
  setColor,
}: {
  mode: "light" | "dark";
  checkMode: Function;
  setLightMode: Function;
  color?: { r: number; g: number; b: number };
  setColor: Function;
}) {
  const { artist } = useParams();

  let idEndIndex = artist?.indexOf("+");
  if (idEndIndex === -1) {
    idEndIndex = artist?.length;
  }
  const artistId = artist?.substring(0, idEndIndex);

  const limit = 100;
  const offset = useRef(0);

  const [artistName, setArtistName] = useState();
  const [artistImage, setArtistImage] = useState<string>();
  const [albums, setAlbums] = useState<TGroupedArtistAlbum[]>([]);
  const [tracks, setTracks] = useState<TGroupedTrack[]>([]);

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(
    () => setQuery(searchParams.get("q") || ""),
    [searchParams.get("q")]
  );

  const [bottomHit, setBottomHit] = useState(false);

  let abortController: AbortController | null = null;

  async function getArtist() {
    const response = await fetch(
      `http://localhost:5500/artist?artistId=${artistId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data.artist;
  }

  async function getArtistAlbums() {
    const response = await fetch(
      `http://localhost:5500/artistAlbums?artistId=${artistId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

  function getArtistStaticData() {
    getArtist().then(({ name, domain_id, domain_name, image_id, r, g, b }) => {
      setArtistName(name);
      setColor({ r, g, b });
      checkMode(r, g, b);
      checkArtistImage(domain_id, domain_name, image_id);
    });
    getArtistAlbums().then(setAlbums);
  }

  useEffect(() => {
    getArtistStaticData();

    return function cleanup() {
      setColor();
      setLightMode();
    };
  }, []);

  async function getTracks() {
    abortController = new AbortController();

    const response = await fetch(
      `http://localhost:5500/artistTracks?artistId=${artistId}&limit=${limit}&offset=${offset.current}&search=${query}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
      }
    );
    const data = await response.json();

    const tracks = transformTracks(data.tracks[0]);

    return tracks;
  }

  async function updateTracks() {
    const tracksGrouped = await getTracks();

    if (offset.current === 0) {
      setTracks(tracksGrouped);
    } else {
      setTracks((tracks) => [...tracks, ...tracksGrouped]);
    }

    setBottomHit(false);
  }

  function incrementOffset() {
    offset.current += limit;
  }

  function updateTracksOnScroll() {
    incrementOffset();
    updateTracks();
  }

  function updateTracksOnQueryChange() {
    setTracks([]);
    offset.current = 0;
    updateTracks();
  }

  useEffect(updateTracksOnQueryChange, [query]);

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
      <Container
        layout="flex"
        bottomHit={bottomHit}
        setBottomHit={setBottomHit}
        updateData={updateTracksOnScroll}
        abortController={abortController}
      >
        {tracks?.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </Container>
    </main>
  );
}

export default Artist;
