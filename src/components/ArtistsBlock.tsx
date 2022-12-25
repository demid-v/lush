import ContainerLayout from "../layouts/ContainerLayout";
import { type ArtistsData, trpc } from "../utils/trpc";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";
import Tile from "./Tile";

const Artists = () => {
  const artists = useContent(trpc.artists.getArtists, 120) as ArtistsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {artists.map(({ id, name, artist_image_rel: images }) => (
          <Tile
            key={id}
            data={{
              id,
              dir: "artists",
              name,
              image: images[0]?.artist_image,
              fallbackImage: "/assets/note.svg",
            }}
          />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default Artists;
