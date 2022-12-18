import { router } from "../trpc";
import { albumsRouter } from "./albums";
import { artistsRouter } from "./artists";
import { playlistsRouter } from "./playlists";
import { tracksRouter } from "./tracks";

export const appRouter = router({
  tracks: tracksRouter,
  artists: artistsRouter,
  albums: albumsRouter,
  playlists: playlistsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
