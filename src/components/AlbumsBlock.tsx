import ContainerLayout from "../layouts/ContainerLayout";
import type { AlbumsData } from "../utils/types";
import { trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";

const Albums = () => {
  const { isLoading, content } = useContent(trpc.albums.getAlbums, 120);

  const albums = content as AlbumsData;

  const defaultImage = "/assets/vynil.svg";

  return (
    <ContainerLayout
      contentLength={albums.length}
      isLoading={isLoading}
      isTiled={true}
      image={defaultImage}
    >
      <GridLayout>
        {albums.map(({ id, name, album_image_rel: images }) => (
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
