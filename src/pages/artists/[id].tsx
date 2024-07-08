import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { extractIdFromQuery, joinParam } from "../../utils";
import Tile from "../../components/Tile";
import TracksBlock from "../../components/TracksBlock";
import PageHeader from "../../components/PageHeader";
import { trpc } from "../../utils/trpc";

const Artist: NextPage = () => {
  const [pageTitle, setPageTitle] = useState("Artist");

  const { q, id } = useRouter().query;
  const artistId = extractIdFromQuery(id);

  const { data } = trpc.artists.getArtist.useQuery(
    {
      artistId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, artist_image_rels: images } = data?.artists[0] ?? {};
  const image = images?.[0]?.artist_image;

  const { data: { albums } = {} } = trpc.albums.getAlbums.useQuery(
    {
      ...(q && { search: joinParam(q) }),
      artistId,
      limit: 6,
    },
    { refetchOnWindowFocus: false }
  );

  if (Number.isNaN(artistId)) return null;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <PageHeader name={name} image={image} setPageTitle={setPageTitle} />
        {albums && albums.length > 0 && (
          <div className="mx-auto mb-5 box-content max-w-[95rem] px-20">
            <ul className="grid grid-cols-[repeat(6,calc((120rem-(12.5rem*2)-(2rem*5))/6))] gap-8 overflow-auto pb-5">
              {albums.map(({ id, name, album_image_rels: images }) => (
                <Tile
                  key={id}
                  data={{
                    id,
                    domain: "albums",
                    name,
                    image: images[0]?.album_image,
                    defaultImage: "/assets/vynil.svg",
                  }}
                />
              ))}
            </ul>
          </div>
        )}
        <TracksBlock params={{ artistId }} />
      </div>
    </>
  );
};

const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
});

const getStaticProps: GetStaticProps = () => ({
  props: {},
});

export default Artist;
export { getStaticPaths, getStaticProps };
