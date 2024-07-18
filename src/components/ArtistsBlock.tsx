"use client";

import ContainerLayout from "../layouts/ContainerLayout";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/trpc/react";

const defaultImage = "/assets/note.svg";

const ArtistsBlock = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q")?.toString();

  const { isLoading, data: artistsData } = api.artist.page.useInfiniteQuery(
    { search: queryParam },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const artists = useMemo(
    () => artistsData?.pages.flatMap((page) => page.artists) ?? [],
    [artistsData?.pages],
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
