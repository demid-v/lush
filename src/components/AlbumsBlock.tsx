import ContainerLayout from "../layouts/ContainerLayout";
import { trpc, type AlbumsData } from "../utils/trpc";
import AlbumTile from "./AlbumTile";
import { useContent } from "../utils/hooks";

const Albums = () => {
  const albums = useContent(trpc.albums.getAlbums, 120) as any as AlbumsData;

  return (
    <ContainerLayout>
      <ul className="grid grid-cols-grid gap-x-6 gap-y-10">
        {albums.map((album) => (
          <AlbumTile key={album.id} album={album} />
        ))}
      </ul>
    </ContainerLayout>
  );
};

export default Albums;
