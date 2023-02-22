import ContainerLayout from "../layouts/ContainerLayout";
import type { ArtistsData } from "../utils/types";
import { trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";

const ArtistsBlock = () => {
  const { content } = useContent(trpc.artists.getArtists, 120);

  const artists = content as ArtistsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {artists.map(({ id, name, artist_image_rel: images }) => (
          <Tile
            key={id}
            data={{
              id,
              domain: "artists",
              name,
              image: images[0]?.artist_image,
              defaultImage: "/assets/note.svg",
            }}
          />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default ArtistsBlock;
