import ContainerLayout from "../layouts/ContainerLayout";
import { type ArtistsData, trpc } from "../utils/trpc";
import ArtistTile from "./ArtistTile";
import { useContent } from "../utils/hooks";

const Artists = () => {
  const artists = useContent(
    trpc.artists.getArtists,
    120
  ) as any as ArtistsData;

  return (
    <ContainerLayout>
      <ul className="grid grid-cols-grid gap-x-6 gap-y-10">
        {artists.map((artist) => (
          <ArtistTile key={artist.id} artist={artist} />
        ))}
      </ul>
    </ContainerLayout>
  );
};

export default Artists;
