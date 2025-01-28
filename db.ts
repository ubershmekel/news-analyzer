import { drizzle } from "drizzle-orm/libsql";
import { dbFileName } from "./drizzle.config";
import { storiesTable } from "./db/schema";

const db = drizzle(dbFileName);

export async function insertStory(story: typeof storiesTable.$inferInsert) {
  return await db.insert(storiesTable).values(story);
}

async function main() {
  //   const story: typeof storiesTable.$inferInsert = {
  //     title: "Hello, World!",
  //     url: "https://example.com",
  //     rssName: "Example",
  //     publishDate: new Date(),
  //   };
  //   await db.insert(storiesTable).values(story);

  const stories = await db.select().from(storiesTable);
  console.log(stories);
}

if (require.main === module) {
  main();
}
