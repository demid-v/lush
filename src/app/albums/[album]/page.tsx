import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageHeader from "~/components/PageHeader";
import TracksWithFallback from "~/components/TracksWithFallback";
import { api } from "~/trpc/server";
import { extractIdFromQuery } from "~/utils";

const AlbumHeader = async ({
  params: { album },
}: {
  params: { album: string };
}) => {
  const albumId = extractIdFromQuery(album);

  const data = await api.album.page({
    albumId,
  });

  const { name, album_image_rels: images } = data?.albums[0] ?? {};
  const image = images?.[0]?.album_image;

  return <PageHeader name={name} image={image} />;
};

const Album = async ({ params: { album } }: { params: { album: string } }) => {
  const albumId = extractIdFromQuery(album);

  if (Number.isNaN(albumId)) return notFound();

  return (
    <div>
      <Suspense fallback={<PageHeader />}>
        <AlbumHeader params={{ album }} />
      </Suspense>
      <TracksWithFallback params={{ albumId }} />
    </div>
  );
};

export default Album;
