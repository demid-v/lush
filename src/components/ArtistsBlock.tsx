import ContainerLayout from "../layouts/ContainerLayout";
import { trpc } from "../utils/trpc";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { joinParam } from "../utils";

const defaultImage = "/assets/note.svg";

const ArtistsBlock = () => {
  const search = joinParam(useRouter().query.q);

  const { isLoading, data: artistsData } =
    trpc.artists.getArtists.useInfiniteQuery(
      { search },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const artists = useMemo(
    () => artistsData?.pages.flatMap((page) => page.artists) ?? [],
    [artistsData?.pages]
  );

  return (
    <ContainerLayout
      contentLength={artists.length}
      isLoading={isLoading}
      isTiled={true}
      image={defaultImage}
    >
      <GridLayout>
        {artists.map(({ id, name, artist_image_rels: images }) => (
          <Tile
            key={id}
            data={{
              id,
              domain: "artists",
              name,
              image: images[0]?.artist_image,
              defaultImage,
            }}
          />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default ArtistsBlock;
