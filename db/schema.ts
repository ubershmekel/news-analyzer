import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { run } from "node:test";

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
  publishDate: int({ mode: "timestamp" }).notNull().default(new Date()),
});

export const cronRunsTable = sqliteTable("cron_runs", {
  id: int().primaryKey({ autoIncrement: true }),
  startDate: int({ mode: "timestamp" }).notNull().default(new Date()),
});

export const summariesTable = sqliteTable("summaries", {
  id: int().primaryKey({ autoIncrement: true }),
  runId: int(),
  title: text().notNull(),
  urlIds: text().notNull(),
  publishDate: int({ mode: "timestamp" }).notNull(),
  generatedDate: int({ mode: "timestamp" }).notNull(),
  daysIncluded: int().notNull().default(1),
});
