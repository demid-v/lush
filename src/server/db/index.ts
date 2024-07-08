import * as schema from "./schema";
import * as relations from "./relations";
import { drizzle } from "drizzle-orm/libsql";
import type { Client } from "@libsql/client";
import { createClient } from "@libsql/client";
import { env } from "../../env/server.mjs";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Client | undefined;
};

const conn =
  globalForDb.conn ??
  createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema: { ...schema, ...relations } });
export type Db = typeof db;