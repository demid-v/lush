import type { inferAsyncReturnType } from "@trpc/server";
import { prisma } from "../db/client";

export const createContextInner = async () => {
  return {
    prisma,
  };
};

export const createContext = async () => {
  return await createContextInner();
};

export type Context = inferAsyncReturnType<typeof createContext>;
