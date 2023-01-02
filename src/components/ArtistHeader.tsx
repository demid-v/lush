import type { Dispatch, FC, SetStateAction } from "react";
import { trpc } from "../utils/trpc";
import PageHeader from "./PageHeader";

const ArtistPageHeader: FC<{
  artistId: number | undefined;
  setPageTitle: Dispatch<SetStateAction<string>>;
}> = ({ artistId, setPageTitle }) => {
  const { data } = trpc.artists.getArtists.useQuery(
    {
      artistId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, artist_image_rel: images } = data?.[0] ?? {};
  const image = images?.[0]?.artist_image;

  return <PageHeader name={name} image={image} setPageTitle={setPageTitle} />;
};

export default ArtistPageHeader;
