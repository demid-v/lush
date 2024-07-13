import { Suspense } from "react";
import AlbumsBlock from "../../components/AlbumsBlock";

const Albums = () => (
  <Suspense>
    <AlbumsBlock />
  </Suspense>
);

export default Albums;
