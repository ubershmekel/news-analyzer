import { writeFile } from "fs/promises";
import { deleteDuplicateStories } from "./db";
import { readRss } from "./readRss";
import {
  generateFrontPageSummaries,
  generateDayTodayAndYesterday,
} from "./summarizer";

const writeJsonFile = async (filePath: string, data: object): Promise<void> => {
  // const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
  const jsonString = JSON.stringify(data);
  await writeFile(filePath, jsonString, "utf-8");
  console.log(`JSON file successfully written to ${filePath}`);
};

async function main() {
  console.log("readRss");
  await readRss();
  console.log("deleteDuplicateStories");
  await deleteDuplicateStories();
  console.log("generateDayTodayAndYesterday");
  await generateDayTodayAndYesterday();
  console.log("generateFrontPageSummaires");
  const payload = await generateFrontPageSummaries();
  // save to json file
  console.log("writeJsonFile");
  const outPath = "./data/news.json";
  await writeJsonFile(outPath, payload);
  // todo: upload new news to bucket
}

if (require.main === module) {
  main();
}
