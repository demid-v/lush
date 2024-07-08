import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { db } from "../db";
import superjson from "superjson";
import { appRouter } from "./router/_app";

const ssg = createProxySSGHelpers({
  router: appRouter,
  ctx: { db },
  transformer: superjson,
});

export { ssg };
