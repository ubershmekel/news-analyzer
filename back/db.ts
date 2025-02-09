import { drizzle } from "drizzle-orm/libsql";
import { dbFileName } from "./drizzle.config";
import { cronRunsTable, storiesTable, summariesTable } from "./db/schema";
import { and, gte, lt, inArray, desc, sql } from "drizzle-orm";

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

// export async function getAllDailySummaries() {
//   return await db.select().from(dailySummariesTable);
// }

export async function getSummariesFromDates(fromDate: Date, toDate: Date) {
  const startDateStart = new Date(fromDate.setHours(0, 0, 0, 0));
  const endOfDayEnd = new Date(toDate.setHours(23, 59, 59, 999));

  return await db
    .select()
    .from(summariesTable)
    .where(
      and(
        gte(summariesTable.publishDate, startDateStart),
        lt(summariesTable.publishDate, endOfDayEnd)
      )
    );
}

export async function insertSummary(
  summary: typeof summariesTable.$inferInsert
) {
  return await db.insert(summariesTable).values(summary);
}

// export async function insertDailySummary(
//   summary: typeof dailySummariesTable.$inferInsert
// ) {
//   return await db.insert(dailySummariesTable).values(summary);
// }

export async function insertStory(story: typeof storiesTable.$inferInsert) {
  return await db.insert(storiesTable).values(story);
}

let lastCronRunId = 0;

export async function newCronRun() {
  const result = await db.insert(cronRunsTable).values({});
  return result.lastInsertRowid as bigint;
}

export async function getCronRunId() {
  if (lastCronRunId) {
    return lastCronRunId;
  }
  lastCronRunId = Number(await newCronRun());
  return lastCronRunId;
}

export async function getStories() {
  return await db.select().from(storiesTable);
}

export async function deleteDuplicateStories() {
  // Delete the stories that are not the first time this
  // URL showed up that CRAWL day.
  // If news outlets repeat this article on another day then that is
  // NOT deleted.
  const delSql = sql`
  DELETE FROM ${storiesTable}
  WHERE ${storiesTable.id} NOT IN (
    SELECT MIN(${storiesTable.id})
    FROM ${storiesTable}
    GROUP BY DATE(${storiesTable.crawlDate}, 'unixepoch'), ${storiesTable.url})
  ;`;
  // const delSql = sql`
  // DELETE FROM stories
  // WHERE stories.id NOT IN (
  //   SELECT MIN(stories.id)
  //   FROM stories
  //   GROUP BY DATE(stories.crawlDate, 'unixepoch'), stories.url)
  // ;`;
  return db.run(delSql);
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
  await deleteDuplicateStories();
}

if (require.main === module) {
  main();
}
