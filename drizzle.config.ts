import { defineConfig } from "drizzle-kit";

export const dbFileName = "file:data/db.sqlite";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbFileName,
  },
});
