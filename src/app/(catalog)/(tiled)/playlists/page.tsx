import { Suspense } from "react";
import PlaylistsBlock from "~/components/PlaylistsBlock";

const Playlists = () => (
  <Suspense>
    <PlaylistsBlock />
  </Suspense>
);

export default Playlists;
