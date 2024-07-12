import { useRouter } from "next/router";
import type { NextPage } from "next";
import TracksBlock from "../../components/TracksBlock";
import PageHeader from "../../components/PageHeader";
import { trpc } from "../../utils/trpc";
import { extractIdFromQuery } from "../../utils";

const Album: NextPage = () => {
  const albumId = extractIdFromQuery(useRouter().query.id);

  const { data } = trpc.album.page.useQuery(
    {
      albumId,
    },
    { refetchOnWindowFocus: false },
  );

  const { name, album_image_rels: images } = data?.albums[0] ?? {};
  const image = images?.[0]?.album_image;

  return (
    <div>
      <PageHeader name={name} image={image} />
      <TracksBlock params={{ albumId }} />
    </div>
  );
};

export default Album;
