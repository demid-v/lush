import { router } from "../trpc";
import { tracksRouter } from "./tracks";

export const appRouter = router({
  tracks: tracksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
