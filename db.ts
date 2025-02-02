import { drizzle } from "drizzle-orm/libsql";
import { dbFileName } from "./drizzle.config";
import { dailySummariesTable, storiesTable } from "./db/schema";
import { and, gte, lt, inArray, desc } from "drizzle-orm";

const db = drizzle(dbFileName);

export async function getLinkIdsToUrls(ids: number[]) {
  // const stories = await getStories();
  // const storyIdToLink: { [id: string]: string } = {};
  // for (const story of stories) {
  //   storyIdToLink[story.id] = story.url;
  // }
  const results = await db
    .select()
    .from(storiesTable)
    .where(inArray(storiesTable.id, ids));
  const storyIdToLink: { [id: string]: string } = {};
  for (const result of results) {
    storyIdToLink[result.id] = result.url;
  }
  return storyIdToLink;
}
export async function getLastStoryDate() {
  const story = await db
    .select()
    .from(storiesTable)
    .orderBy(desc(storiesTable.publishDate))
    .limit(1);
  return story[0]?.publishDate;
}

export async function getFirstStoryDate() {
  const story = await db
    .select()
    .from(storiesTable)
    .orderBy(storiesTable.publishDate)
    .limit(1);
  return story[0]?.publishDate;
}

export async function getAllDailySummaries() {
  return await db.select().from(dailySummariesTable);
}

export async function getDailySummariesFromDates(fromDate: Date, toDate: Date) {
  const startDateStart = new Date(fromDate.setHours(0, 0, 0, 0));
  const endOfDayEnd = new Date(toDate.setHours(23, 59, 59, 999));

  return await db
    .select()
    .from(dailySummariesTable)
    .where(
      and(
        gte(dailySummariesTable.publishDate, startDateStart),
        lt(dailySummariesTable.publishDate, endOfDayEnd)
      )
    );
}

export async function insertDailySummary(
  summary: typeof dailySummariesTable.$inferInsert
) {
  return await db.insert(dailySummariesTable).values(summary);
}

export async function insertStory(story: typeof storiesTable.$inferInsert) {
  return await db.insert(storiesTable).values(story);
}

export async function getStories() {
  return await db.select().from(storiesTable);
}

export async function getStoriesFromDate(when: Date) {
  const startOfDay = new Date(when.setHours(0, 0, 0, 0));
  const endOfDay = new Date(when.setHours(23, 59, 59, 999));

  return await db
    .select()
    .from(storiesTable)
    .where(
      and(
        gte(storiesTable.publishDate, startOfDay),
        lt(storiesTable.publishDate, endOfDay)
      )
    );
}

export function getDb() {
  return db;
}

async function main() {
  //   const story: typeof storiesTable.$inferInsert = {
  //     title: "Hello, World!",
  //     url: "https://example.com",
  //     rssName: "Example",
  //     publishDate: new Date(),
  //   };
  //   await db.insert(storiesTable).values(story);

  //   const stories = await db.select().from(storiesTable);
  //   console.log(stories);
  const when = "2025-01-29";
  const stories = await getStoriesFromDate(new Date(when));
  console.log(`Stories from ${when}: ${stories.length}`);
  console.log(stories[0]);
  console.log(stories[1]);
  console.log(stories[2]);
}

if (require.main === module) {
  main();
}
