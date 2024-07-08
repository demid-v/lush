import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "../db";

export const createContextInner = async () => {
  return { db };
};

export const createContext = async () => {
  return await createContextInner();
};

export type Context = inferAsyncReturnType<typeof createContext>;
