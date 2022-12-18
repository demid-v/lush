import { useRouter } from "next/router";
import TracksBlock from "../../components/TracksBlock";
import { useTheme } from "../../contexts/Theme";
import { DOMAIN_MID_PATH } from "../../utils/globals";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Artist: NextPage = () => {
  const { id, q } = useRouter().query;

  const { theme, setColor } = useTheme();

  const artistId = (() => {
    let artistId = Array.isArray(id) ? id.join("") : id;
    artistId = artistId?.split(/\+(.*)/s)[0];
    return typeof artistId === "string" ? Number(artistId) : artistId;
  })();

  const { data: artistsData } = trpc.artists.getArtists.useQuery(
    {
      ...(q && { search: Array.isArray(q) ? q.join("") : q }),
      artistId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name: artistName, artist_image_rel: artistImages } =
    artistsData?.[0] ?? {};

  const artistImage = artistImages?.[0]?.artist_image;

  const { r, g, b } = artistImage ?? {};

  useEffect(() => {
    if (r !== undefined && g !== undefined && b !== undefined) {
      setColor(r, g, b);
    }

    return () => setColor(255, 255, 255);
  }, [artistsData, r, g, b, setColor]);

  const { domain, image_id } = artistImage ?? {};

  const artistImageUrl = domain
    ? domain.name + "/" + DOMAIN_MID_PATH[domain.id] + image_id
    : "";

  const { data: albums } = trpc.albums.getAlbums.useQuery(
    {
      ...(q && { search: Array.isArray(q) ? q.join("") : q }),
      artistId,
      limit: 6,
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      <Head>
        <title>{artistName || "Artist"}</title>
      </Head>
      <div className="w-full">
        <div>
          <div className="relative mb-10">
            <Image
              src={artistImageUrl || "/logo512.png"}
              alt={"Image of " + artistName}
              width={1920}
              height={400}
              className="h-[25rem] w-full object-cover object-[0%_25%]"
            />
            <div
              className="absolute top-0 right-0 h-full w-full"
              style={{
                background: `linear-gradient(rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`,
              }}
            ></div>
            <div className="absolute top-0 left-0 w-full max-w-[50%] pt-[3.75rem] pl-[12.5rem]">
              <div
                className={
                  "mb-[1.875rem] text-[2.5rem] font-bold" +
                  (theme === "dark" ? " text-white" : "")
                }
              >
                {artistName}
              </div>
              <button className="h-10 w-[10.625rem] border border-[rgba(180,180,180,1)] bg-white">
                <div className="flex justify-center">
                  <Image
                    src="/static/assets/play-button.svg"
                    alt="Play artist"
                    width={54}
                    height={54}
                    className="mr-2.5 w-[0.938rem]"
                  />
                  <div className="font-['Open_Sans'] text-[0.78rem] uppercase tracking-[0.04rem]">
                    Play artist
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="mx-[12.5rem] mb-[1.563rem]">
            <ul className="grid grid-cols-[repeat(6,minmax(200px,_1fr))] gap-[3.125rem] overflow-auto">
              {albums?.map(
                ({
                  id,
                  title,
                  album_image_rel: albumImages,
                  // track_album_rel: tracks,
                }) => {
                  const albumImage = albumImages?.[0]?.album_image;

                  const { domain_id, image_id } = albumImage ?? {};

                  const albumImageUrl = domain_id
                    ? "https://lastfm.freetls.fastly.net/" +
                      DOMAIN_MID_PATH[domain_id] +
                      image_id
                    : "/logo512.png";

                  return (
                    <li key={id}>
                      <div className="artist__album-container">
                        <Link href="/albums" className="tile__link">
                          <picture className={"tile__image-wrapper"}>
                            <Image
                              src={albumImageUrl}
                              alt={"Image of " + title}
                              width={230}
                              height={230}
                              className="aspect-square"
                            />
                          </picture>
                        </Link>
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
            </ul>
          </div>
        </div>
        <TracksBlock artistId={artistId} />
      </div>
    </>
  );
};

export default Artist;
