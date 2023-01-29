import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { prisma } from "../db/client";
import superjson from "superjson";
import { appRouter } from "./router/_app";

const ssg = createProxySSGHelpers({
  router: appRouter,
  ctx: { prisma },
  transformer: superjson,
});

export { ssg };
