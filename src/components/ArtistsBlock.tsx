import ContainerLayout from "../layouts/ContainerLayout";
import type { ArtistsData } from "../utils/types";
import { trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { joinParam } from "../utils";

const ArtistsBlock = () => {
  const { q } = useRouter().query;
  const search = joinParam(q);

  const { isLoading, data: artistsData } =
    trpc.artists.getArtists.useInfiniteQuery(
      { search },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const artists = useMemo(
    () => artistsData?.pages.flatMap((page) => page.artists) ?? [],
    [artistsData?.pages]
  );

  const defaultImage = "/assets/note.svg";

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
