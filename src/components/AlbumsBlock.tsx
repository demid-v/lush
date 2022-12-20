import ContainerLayout from "../layouts/ContainerLayout";
import { trpc, type AlbumsData } from "../utils/trpc";
import AlbumTile from "./AlbumTile";
import { useContent } from "../utils/hooks";
import GridLayout from "../layouts/GridLayout";

const Albums = () => {
  const albums = useContent(trpc.albums.getAlbums, 120) as never as AlbumsData;

  return (
    <ContainerLayout>
      <GridLayout>
        {albums.map((album) => (
          <AlbumTile key={album.id} album={album} />
        ))}
      </GridLayout>
    </ContainerLayout>
  );
};

export default Albums;
