import type { Dispatch, FC, SetStateAction } from "react";
import { trpc } from "../utils/trpc";
import PageHeader from "./PageHeader";

const AlbumHeader: FC<{
  albumId: number | undefined;
  setPageTitle: Dispatch<SetStateAction<string>>;
}> = ({ albumId, setPageTitle }) => {
  const { data } = trpc.albums.getAlbums.useQuery(
    {
      albumId,
    },
    { refetchOnWindowFocus: false }
  );

  const { name, album_image_rel: images } = data?.[0] ?? {};
  const image = images?.[0]?.album_image;

  return <PageHeader name={name} image={image} setPageTitle={setPageTitle} />;
};

export default AlbumHeader;
