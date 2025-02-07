import { deleteDuplicateStories } from "./db";
import { readRss } from "./readRss";

async function main() {
  await readRss();
  await deleteDuplicateStories();
}

if (require.main === module) {
  main();
}
