import { createCallerFactory, createTRPCRouter } from "./trpc";
import { albumRouter } from "./routers/albums";
import { artistRouter } from "./routers/artists";
import { playlistRouter } from "./routers/playlists";
import { trackRouter } from "./routers/tracks";

export const appRouter = createTRPCRouter({
  track: trackRouter,
  artist: artistRouter,
  album: albumRouter,
  playlist: playlistRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
