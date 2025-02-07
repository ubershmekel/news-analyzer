import { writeFile } from "fs/promises";
import { deleteDuplicateStories } from "./db";
import { readRss } from "./readRss";
import {
  generateFrontPageSummaires,
  generateDayTodayAndYesterday,
} from "./summarizer";

const writeJsonFile = async (filePath: string, data: object): Promise<void> => {
  // const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
  const jsonString = JSON.stringify(data);
  await writeFile(filePath, jsonString, "utf-8");
  console.log(`JSON file successfully written to ${filePath}`);
};

async function main() {
  await readRss();
  await deleteDuplicateStories();
  await generateDayTodayAndYesterday();
  const payload = await generateFrontPageSummaires();
  // save to json file
  const outPath = "./data/news.json";
  await writeJsonFile(outPath, payload);
  // todo: upload new news to bucket
}

if (require.main === module) {
  main();
}
