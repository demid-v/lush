import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { spreadParam } from "../../utils/functions";
import Tile from "../../components/Tile";
import ArtistHeader from "../../components/ArtistHeader";
import TracksBlock from "../../components/TracksBlock";

const Artist: NextPage = () => {
  const { id, q } = useRouter().query;

  const [pageTitle, setPageTitle] = useState("Artist");

  const artistId = (() => {
    let artistId = Array.isArray(id) ? id.join("") : id;
    artistId = artistId?.split(/\+(.*)/s)[0];
    return typeof artistId === "string" ? Number(artistId) : artistId;
  })();

  const { data: albums } = trpc.albums.getAlbums.useQuery(
    {
      ...(q && { search: spreadParam(q) }),
      artistId,
      limit: 6,
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <ArtistHeader artistId={artistId} setPageTitle={setPageTitle} />
        <div className="mx-auto box-content max-w-[95rem] px-20">
          <ul className="grid grid-cols-[repeat(6,calc((120rem-(12.5rem*2)-(2rem*5))/6))] gap-8 overflow-auto pb-5">
            {albums?.map(({ id, name, album_image_rel: images }) => (
              <Tile
                key={id}
                data={{
                  id,
                  domain: "albums",
                  name,
                  image: images[0]?.album_image,
                  fallbackImage: "/assets/vynil.svg",
                }}
              />
            ))}
          </ul>
        </div>
        <TracksBlock params={{ artistId }} />
      </div>
    </>
  );
};

export default Artist;
