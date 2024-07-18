import { extractIdFromQuery, joinParam } from "../../../utils";
import Tile from "../../../components/Tile";
import TracksBlock from "../../../components/TracksBlock";
import PageHeader from "../../../components/PageHeader";
import { api } from "~/trpc/server";

const Artist = async ({
  params: { artist },
  searchParams,
}: {
  params: { artist: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const artistId = extractIdFromQuery(artist);
  const { q } = searchParams ?? {};

  const data = await api.artist.one({ artistId });

  const { name, artist_image_rels: images } = data?.artists[0] ?? {};
  const image = images?.[0]?.artist_image;

  const { albums } = await api.album.page({
    ...(q && { search: joinParam(q) }),
    artistId,
    limit: 6,
  });

  if (Number.isNaN(artistId)) return null;

  return (
    <>
      <div>
        <PageHeader name={name} image={image} />
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

export default Artist;
