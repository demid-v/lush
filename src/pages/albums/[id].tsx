import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import TracksBlock from "../../components/TracksBlock";
import PageHeader from "../../components/PageHeader";
import { trpc } from "../../utils/trpc";
import { extractIdFromQuery } from "../../utils/functions";

const Album: NextPage = () => {
  const [pageTitle, setPageTitle] = useState("Album");

  const albumId = extractIdFromQuery(useRouter().query.id);

  const { data } = trpc.albums.getAlbums.useQuery(
    {
      albumId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, album_image_rel: images } = data?.[0] ?? {};
  const image = images?.[0]?.album_image;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <PageHeader name={name} image={image} setPageTitle={setPageTitle} />
        <TracksBlock params={{ albumId }} />
      </div>
    </>
  );
};

export default Album;
