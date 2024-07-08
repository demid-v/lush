import ContainerLayout from "../layouts/ContainerLayout";
import { trpc } from "../utils/trpc";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";
import { useRouter } from "next/router";
import { joinParam } from "../utils";
import { useMemo } from "react";

const defaultImage = "/assets/vynil.svg";

const Albums = () => {
  const search = joinParam(useRouter().query.q);

  const { isLoading, data: albumsData } =
    trpc.albums.getAlbums.useInfiniteQuery(
      { search },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const albums = useMemo(
    () => albumsData?.pages.flatMap((page) => page.albums) ?? [],
    [albumsData?.pages]
  );

  return (
    <ContainerLayout
      contentLength={albums.length}
      isLoading={isLoading}
      isTiled={true}
      image={defaultImage}
    >
      <GridLayout>
        {albums.map(({ id, name, album_image_rels: images }) => (
          <Tile
            key={id}
            data={{
              id,
              domain: "albums",
              name,
              image: images[0]?.album_image,
              defaultImage,
            }}
          />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default Albums;
