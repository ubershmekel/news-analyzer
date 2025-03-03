import { drizzle } from "drizzle-orm/libsql";
import { dbFileName } from "./drizzle.config";
import { cronRunsTable, storiesTable, summariesTable } from "./db/schema";
import { and, gte, lt, inArray, desc, sql, Table, eq } from "drizzle-orm";

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

function newDateSetHours(
  date: Date,
  hours: number,
  min?: number,
  sec?: number,
  ms?: number
): Date {
  // There were bugs caused by code like `date.setHours(0, 0, 0, 0);`
  // because that would change the original date object which was
  // still in-use up the call stack.
  const newDate = new Date(date);
  newDate.setHours(hours, min ?? 0, sec ?? 0, ms ?? 0);
  return newDate;
}

export async function getSummariesFromDates(fromDate: Date, toDate: Date) {
  const startDateStart = newDateSetHours(fromDate, 0, 0, 0, 0);
  const endOfDayEnd = newDateSetHours(toDate, 23, 59, 59, 999);

  return await db
    .select()
    .from(summariesTable)
    .where(
      and(
        gte(summariesTable.publishDate, startDateStart),
        lt(summariesTable.publishDate, endOfDayEnd),
        eq(summariesTable.daysIncluded, 0)
      )
    );
}

export async function getUniqueSummariesFromDates(
  fromDate: Date,
  toDate: Date
) {
  const startDateStart = newDateSetHours(fromDate, 0, 0, 0, 0);
  const endOfDayEnd = newDateSetHours(toDate, 23, 59, 59, 999);

  // If a date has multiple rows, only get the 5 with the most recent generatedDate.
  const getSummariesQuery = sql`
  WITH RankedRows AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY DATE(publishDate, 'unixepoch') ORDER BY generatedDate DESC) AS rn
    FROM summaries
    WHERE
      daysIncluded = 0
      AND publishDate >= ${startDateStart.getTime() / 1000}
      AND publishDate <= ${endOfDayEnd.getTime() / 1000}
  )
  SELECT *
  FROM RankedRows
  WHERE
    rn <= 5
  ORDER BY publishDate ASC
  ;
`;

  const result = await db.run(getSummariesQuery);
  return mapDriverValues(summariesTable, result);
}

function mapDriverValues(table: Table, result: any) {
  // https://github.com/drizzle-team/drizzle-orm/issues/1953
  for (const row of result.rows) {
    for (const colName of Object.keys(table)) {
      const col = table[colName];
      row[colName] = col.mapFromDriverValue(row[colName]) as any;
    }
  }
  return result.rows as any as (typeof table.$inferSelect)[];
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

export async function deleteStoriesWithDupUrls() {
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
  const startOfDay = newDateSetHours(when, 0, 0, 0, 0);
  const endOfDay = newDateSetHours(when, 23, 59, 59, 999);

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
  // console.log(stories[2]);
  // await deleteDuplicateStories();

  // const summaries = await getUniqueSummariesFromDates(
  //   // const summaries = await getSummariesFromDates(
  //   new Date("2025-01-21"),
  //   new Date("2025-02-09")
  // );
  // console.log(summaries.length);
  // console.log(summaries[0].publishDate);
  // console.log(summaries[0].publishDate.toISOString());
}

if (require.main === module) {
  main();
}
