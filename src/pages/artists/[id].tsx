import { useRouter } from "next/router";
import TracksBlock from "../../components/TracksBlock";
import { useTheme } from "../../contexts/Theme";
import { DOMAIN_MID_PATH } from "../../utils/globals";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";

const Artist: NextPage = () => {
  const router = useRouter();
  const { id, q } = router.query;

  const { theme, setColor } = useTheme();

  const artistId = (() => {
    let artistId = Array.isArray(id) ? id.join("") : id;
    artistId = artistId?.split(/\+(.*)/s)[0];
    return typeof artistId === "string" ? Number(artistId) : artistId;
  })();

  const { isLoading: areArtistsLoading, data: artistsData } =
    trpc.artists.getArtists.useQuery(
      {
        ...(q && { search: Array.isArray(q) ? q.join("") : q }),
        artistId,
      },
      { refetchOnWindowFocus: false }
    );

  const { name: artistName, artist_image_rel: artistImages } =
    artistsData?.artists[0] ?? {};

  const artistImage = artistImages?.[0]?.artist_image;

  const { r, g, b } = artistImage ?? {};

  useEffect(() => {
    if (r !== undefined && g !== undefined && b !== undefined) {
      setColor(r, g, b);
    }

    return () => setColor(255, 255, 255);
  }, [artistsData]);

  const { domain, image_id } = artistImage ?? {};

  const artistImageUrl = domain
    ? domain.name + "/" + DOMAIN_MID_PATH[domain.id] + image_id
    : "";

  const { isLoading: areAlbumsLoading, data: albumsData } =
    trpc.albums.getAlbums.useQuery(
      {
        ...(q && { search: Array.isArray(q) ? q.join("") : q }),
        artistId,
        limit: 6,
      },
      { refetchOnWindowFocus: false }
    );

  const albums = albumsData?.albums;

  return (
    <>
      <Head>{artistName}</Head>
      <div>
        <div>
          <div className="artist-info">
            <div
              className="artist-background"
              style={{
                background: `linear-gradient(rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`,
              }}
            ></div>
            <div className="artist-container">
              <Image
                src={artistImageUrl}
                alt={"Image of " + artistImage}
                width={1920}
                height={400}
              />
              <div className="artist-overlay">
                <div
                  className={
                    "artist-name" +
                    (theme === "dark" ? " artist-name_light" : "")
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
              {albums?.map(
                ({
                  id,
                  title,
                  album_image_rel: albumImages,
                  track_album_rel: tracks,
                }) => {
                  const albumImage = albumImages?.[0]?.album_image;

                  const { domain_id, image_id } = albumImage ?? {};

                  const albumImageUrl = domain_id
                    ? "https://lastfm.freetls.fastly.net/" +
                      DOMAIN_MID_PATH[domain_id] +
                      image_id
                    : "";

                  return (
                    <li key={id} className="tile artist__album">
                      <div className="artist__album-container">
                        <a href="/albums" className="tile__link">
                          <picture className={"tile__image-wrapper"}>
                            <Image
                              src={albumImageUrl}
                              alt={"Image of " + title}
                              width={400}
                              height={400}
                            />
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
                }
              )}
            </ol>
          </div>
        </div>
        <TracksBlock artistId={artistId} />
      </div>
    </>
  );
};

export default Artist;
