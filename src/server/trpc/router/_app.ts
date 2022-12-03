import { router } from "../trpc";
import { artistsRouter } from "./artists";
import { tracksRouter } from "./tracks";

export const appRouter = router({
  tracks: tracksRouter,
  artists: artistsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
