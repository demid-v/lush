import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import AlbumHeader from "../../components/AlbumHeader";
import TracksBlock from "../../components/TracksBlock";

const Album: NextPage = () => {
  const { id } = useRouter().query;

  const [pageTitle, setPageTitle] = useState("Album");

  const albumId = (() => {
    let albumId = Array.isArray(id) ? id.join("") : id;
    albumId = albumId?.split(/\+(.*)/s)[0];
    return typeof albumId === "string" ? Number(albumId) : albumId;
  })();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <AlbumHeader albumId={albumId} setPageTitle={setPageTitle} />
        <TracksBlock params={{ albumId }} />
      </div>
    </>
  );
};

export default Album;
