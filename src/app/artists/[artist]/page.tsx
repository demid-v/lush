import { api } from "~/trpc/server";
import Tile from "~/components/Tile";
import { extractIdFromQuery, joinParam } from "~/utils";
import TracksWithFallback from "~/components/TracksWithFallback";
import PageHeader from "~/components/PageHeader";
import { Suspense } from "react";
import TileSkeleton from "~/components/TileSkeleton";

const ArtistHeader = async ({
  params: { artist },
}: {
  params: { artist: string };
}) => {
  const artistId = extractIdFromQuery(artist);

  const data = await api.artist.one({ artistId });

  const { name, artist_image_rels: images } = data?.artists[0] ?? {};
  const image = images?.[0]?.artist_image;

  return <PageHeader name={name} image={image} />;
};

const Albums = async ({
  params: { artist },
  searchParams,
}: {
  params: { artist: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const artistId = extractIdFromQuery(artist);
  const { q } = searchParams ?? {};

  const { albums } = await api.album.page({
    ...(q && { search: joinParam(q) }),
    artistId,
    limit: 6,
  });

  return (
    <>
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
    </>
  );
};

const AlbumsSkeleton = () => (
  <div className="mx-auto mb-5 box-content max-w-[95rem] px-20">
    <ul className="grid grid-cols-[repeat(6,calc((120rem-(12.5rem*2)-(2rem*5))/6))] gap-8 overflow-auto pb-5">
      {new Array(6).fill(0).map((_item, index) => (
        <TileSkeleton key={index} image="/assets/vynil.svg" />
      ))}
    </ul>
  </div>
);

const Artist = async ({
  params: { artist },
}: {
  params: { artist: string };
}) => {
  const artistId = extractIdFromQuery(artist);

  if (Number.isNaN(artistId)) return null;

  return (
    <>
      <Suspense fallback={<PageHeader />}>
        <ArtistHeader params={{ artist }} />
      </Suspense>
      <div>
        <Suspense fallback={<AlbumsSkeleton />}>
          <Albums params={{ artist }} />
        </Suspense>
        <TracksWithFallback params={{ artistId }} />
      </div>
    </>
  );
};

export default Artist;
