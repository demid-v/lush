import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "../db";
import { prisma } from "../db/client";

export const createContextInner = async () => {
  return { prisma, db };
};

export const createContext = async () => {
  return await createContextInner();
};

export type Context = inferAsyncReturnType<typeof createContext>;
