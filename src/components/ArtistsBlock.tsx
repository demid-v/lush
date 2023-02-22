import ContainerLayout from "../layouts/ContainerLayout";
import type { ArtistsData } from "../utils/types";
import { trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";

const ArtistsBlock = () => {
  const { isLoading, content } = useContent(trpc.artists.getArtists, 120);

  const artists = content as ArtistsData;

  const defaultImage = "/assets/note.svg";

  return (
    <ContainerLayout
      contentLength={artists.length}
      isLoading={isLoading}
      isTiled={true}
      image={defaultImage}
    >
      <GridLayout>
        {artists.map(({ id, name, artist_image_rel: images }) => (
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
