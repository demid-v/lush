import { useRouter } from "next/router";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useState } from "react";
import Head from "next/head";
import { extractIdFromQuery, joinParam } from "../../utils";
import Tile from "../../components/Tile";
import TracksBlock from "../../components/TracksBlock";
import PageHeader from "../../components/PageHeader";
import { trpc } from "../../utils/trpc";
import { prisma } from "../../server/db/client";
import { ssg } from "../../server/trpc/ssg";

const Artist: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  artistId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pageTitle, setPageTitle] = useState("Artist");

  const { q } = useRouter().query;

  const { data } = trpc.artists.getArtist.useQuery(
    {
      artistId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, artist_image_rel: images } = data?.[0] ?? {};
  const image = images?.[0]?.artist_image;

  const { data: albums } = trpc.albums.getAlbums.useQuery(
    {
      ...(q && { search: joinParam(q) }),
      artistId,
      limit: 6,
    },
    { refetchOnWindowFocus: false }
  );

  if (artistId === undefined) return null;

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
              {albums.map(({ id, name, album_image_rel: images }) => (
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

const getStaticPaths: GetStaticPaths = async () => {
  const artists = await prisma.artist.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    paths: artists.map(({ id, name }) => ({
      params: {
        id: id + (name.match(/<|>|:|"|\?|\*/) ? "" : "+" + name),
      },
    })),
    fallback: true,
  };
};

const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string }>) => {
  const artistId = extractIdFromQuery(params?.id);

  await ssg.artists.getArtist.prefetch({ artistId });
  await ssg.albums.getAlbums.prefetch({ artistId, limit: 6 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      artistId,
    },
  };
};

export default Artist;
export { getStaticPaths, getStaticProps };
