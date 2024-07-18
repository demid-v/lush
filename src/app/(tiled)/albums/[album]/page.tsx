import PageHeader from "~/components/PageHeader";
import TracksBlock from "~/components/TracksBlock";
import { api } from "~/trpc/server";
import { extractIdFromQuery, joinParam } from "~/utils";

const Album = async ({
  params: { album },
  searchParams,
}: {
  params: { album: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const albumId = extractIdFromQuery(album);
  const { q } = searchParams ?? {};

  const data = await api.album.page({
    ...(q && { search: joinParam(q) }),
    albumId,
  });

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
