import { sql } from "drizzle-orm";
import { getDb, getLastStoryDate } from "./db";

const query = `
SELECT
  COUNT(*) AS the_count,
  Datetime(publishDate, 'unixepoch') AS pubDate
FROM daily_summaries
GROUP BY pubDate
ORDER BY pubDate DESC;
`;

async function main() {
  const db = getDb();
  console.log(await getLastStoryDate());
  const res = await db.run(query);
  console.log(res);
}

if (require.main === module) {
  main();
}
