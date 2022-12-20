import ContainerLayout from "../layouts/ContainerLayout";
import { type ArtistsData, trpc } from "../utils/trpc";
import ArtistTile from "./ArtistTile";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";

const Artists = () => {
  const artists = useContent(
    trpc.artists.getArtists,
    120
  ) as never as ArtistsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {artists.map((artist) => (
          <ArtistTile key={artist.id} artist={artist} />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default Artists;
