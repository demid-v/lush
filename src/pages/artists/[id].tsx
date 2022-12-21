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
          <div className="relative mb-10 h-[25rem]">
            {artistImageUrl && (
              <Image
                src={artistImageUrl}
                alt={"Image of " + artistName}
                width={1920}
                height={400}
                className="h-full w-full object-cover object-[0%_25%]"
              />
            )}
            <div
              className="absolute top-0 right-0 h-full w-full"
              style={{
                background: `linear-gradient(rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`,
              }}
            ></div>
            <div className="absolute top-[3.75rem] w-full">
              <div className="mx-auto box-content max-w-[95rem] px-20">
                <div className="w-1/2">
                  <div
                    className={
                      "mb-[1.875rem] text-[2.5rem] font-bold" +
                      (theme === "dark" ? " text-white" : "")
                    }
                  >
                    {artistName}
                  </div>
                </div>
                <button className="h-10 w-[10.625rem] border border-[rgba(180,180,180,1)] bg-white">
                  <div className="flex justify-center">
                    <Image
                      src="/assets/play.svg"
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
          </div>
          <div className="mx-auto box-content max-w-[95rem] px-20">
            <ul className="grid grid-cols-[repeat(6,calc((120rem-(12.5rem*2)-(2rem*5))/6))] gap-8 overflow-auto pb-5">
              {albums?.map(({ id, title, album_image_rel: albumImages }) => {
                const albumImage = albumImages?.[0]?.album_image;
                const { domain_id, image_id } = albumImage ?? {};

                const albumImageUrl = domain_id
                  ? "https://lastfm.freetls.fastly.net/" +
                    DOMAIN_MID_PATH[domain_id] +
                    image_id
                  : "/assets/vynil.svg";

                return (
                  <li key={id}>
                    <div>
                      <Link href="/albums" className="mb-3 block">
                        <picture className="relative block pb-[100%]">
                          <Image
                            src={albumImageUrl}
                            alt={"Image of " + title}
                            width={230}
                            height={230}
                            className={
                              "absolute aspect-square" +
                              (albumImageUrl.split("/")[1] === "assets"
                                ? " top-0 right-0 bottom-0 left-0 m-auto w-[45%]"
                                : "")
                            }
                          />
                        </picture>
                      </Link>
                      <div className="font-medium">{title}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <TracksBlock artistId={artistId} />
      </div>
    </>
  );
};

export default Artist;
