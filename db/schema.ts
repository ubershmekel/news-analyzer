import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const storiesTable = sqliteTable("stories", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  url: text().notNull(),
  rssName: text().notNull(),
  publishDate: int({ mode: "timestamp" }).notNull(),
  crawlDate: int({ mode: "timestamp" }).notNull(),
});

export const dailySummariesTable = sqliteTable("daily_summaries", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  urlIds: text().notNull(),
  publishDate: int({ mode: "timestamp" }).notNull(),
});
