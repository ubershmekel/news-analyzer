import { promises as fs } from "fs";
import { ask } from "./ai";
import {
  getDailySummaries,
  getFirstStoryDate,
  getLinkIdsToUrls,
  getStories,
  getStoriesFromDate,
  insertDailySummary,
} from "./db";
import { storiesTable } from "./db/schema";

const bigPrompt = `Please summarize the top 5 stories from the following list.
You will output 5 lines.
Each output line will be the most important, unique, impactful, or interesting story that you can summarize from the input list.
Make sure the lines have no overlap, are not repetitive or redundant.
Each line in the input list starts with a number story ID.
Each output line should start with the title, do not start with a numbering.
Do not use any markdown or special characters in the output lines.
Add at the end of each output line a list of up to 10 relevant story IDs separated by commas in parenthesis like (4, 15, 97) or (10, 29, 35, 421, 507)
The input list is as follows:
`;

const exampleAnswer = `1) Israel and Hamas reach a significant deal to release hostages and facilitate Palestinian return to Gaza, showcasing a thaw in tensions. (5, 251, 223)
2) Belarus' President Lukashenko extends his rule following disputed elections criticized by the opposition and EU. (2, 236, 204)
3) 13 UN peacekeepers and soldiers die as M23 rebels gain ground in Congo, highlighting ongoing instability in the region. (6, 240, 118)
4) Palestinians return to northern Gaza, illustrating shifts in territorial access amid cease-fire negotiations with Israel. (4, 238, 144)
`;

function promptifyStories(stories: (typeof storiesTable.$inferSelect)[]) {
  const storyLines: string[] = [bigPrompt];
  for (const story of stories) {
    storyLines.push(`${story.id}) ${story.title}`);
  }
  const textQuestion = storyLines.join("\n");
  return textQuestion;
}

async function summarize() {
  const stories = await getStories();
  console.log(`${stories.length} stories`);
  const textQuestion = promptifyStories(stories);
  console.log(`Asking: ${textQuestion.length} character long question`);
  const result = await ask(textQuestion);
  console.log(result.message.content);
  return result.message.content;
}

function splitStoryIds(line: string) {
  const res = {
    lineNoIds: "",
    ids: [] as string[],
  };
  const match = line.match(/\(([\s0-9,]*?)\)/);
  if (match) {
    res.ids = match[1].split(", ");
    const lineNoIds = line.replace(match[0], "");
    const cleanLine = lineNoIds.replace(/^\d+\)\s+/, "").trim();
    res.lineNoIds = cleanLine;
  }
  return res;
}

async function linkify(answer: string) {
  const stories = await getStories();
  const storyIdToLink: { [id: string]: string } = {};
  for (const story of stories) {
    storyIdToLink[story.id] = story.url;
  }

  const linkifiedLines: string[] = [];
  for (const line of answer.split("\n")) {
    const match = line.match(/\((.*?)\)/);
    if (match) {
      const ids = match[1].split(", ");
      // remove duplicate URLs
      const urls = new Set(ids.map((id) => storyIdToLink[id]));
      const lineNoIds = line.replace(match[0], "");
      const cleanLine = lineNoIds.replace(/^\d+\)\s+/, "").trim();
      if (cleanLine.length === 0) {
        console.log(`Skipping empty line`);
        continue;
      }
      linkifiedLines.push(cleanLine);
      for (const url of urls) {
        linkifiedLines.push(url);
      }
      linkifiedLines.push("");

      //   for (const id of ids) {
      //     console.log(`${id}`);
      //   }
    }
  }

  console.log(linkifiedLines.join("\n"));
}

async function summarizeDates() {
  // get first story date
  const startDate = await getFirstStoryDate();
  // iterate over days since startDate
  //   const startDate = "2025-01-29";

  let i = -1;
  while (true) {
    i += 1;
    const when = new Date(startDate);
    when.setDate(when.getDate() + i);
    const stories = await getStoriesFromDate(new Date(when));
    if (stories.length === 0) {
      console.log(`No stories from ${when}`);
      break;
    }
    if (stories.length <= 10) {
      console.log(`Stories from ${when}: ${stories.length} so skipping`);
      continue;
    }
    console.log(`Stories from ${when}: ${stories.length}`);
    const textQuestion = promptifyStories(stories);
    console.log(`Asking: ${textQuestion.length} character long question`);
    const result = await ask(textQuestion);
    const resText = result.message.content;
    if (!resText) {
      console.error(`No response from AI for ${when}`);
      continue;
    }
    console.log(resText);
    for (const line of resText.split("\n")) {
      const { lineNoIds, ids } = splitStoryIds(line);
      if (lineNoIds.length === 0) {
        console.log(`Skipping empty line`);
        continue;
      }

      await insertDailySummary({
        publishDate: when,
        title: lineNoIds,
        urlIds: ids.join(","),
      });
    }
    // console.log(stories[0]);
    // console.log(stories[1]);
    // console.log(stories[2]);
  }
}

async function markdownDailySummaries() {
  const summaries = await getDailySummaries();
  // console.log(summaries);
  const allLinkIds: number[] = [];
  for (const summary of summaries) {
    const ids = summary.urlIds.split(",").map((id) => parseInt(id));
    allLinkIds.push(...ids);
  }
  const linkIdToUrl = await getLinkIdsToUrls(allLinkIds);
  const lines: string[] = [];
  for (const summary of summaries) {
    const urlParts: string[] = [];
    const ids = summary.urlIds.split(",").map((id) => parseInt(id));
    for (const id of ids) {
      const url = linkIdToUrl[id];
      urlParts.push(`[${id}](${url})`);
    }
    const urlSection = urlParts.join(", ");
    const formattedDate = summary.publishDate.toISOString().split("T")[0];
    const line = `* ${formattedDate} ${summary.title} (${urlSection})`;
    console.log(line);
    lines.push(line);
  }

  const content = lines.join("\n");
  await fs.writeFile("./data/summaries.txt", content, "utf8");
}

async function summarizeAll() {
  const summary = (await summarize()) as string;
  console.log(summary);
  const linkedSummary = await linkify(summary);
  console.log("-------");
  console.log(linkedSummary);
}

async function main() {
  await markdownDailySummaries();
  //   await summarizeAll();
  // await summarizeDates();
}

if (require.main === module) {
  main();
}
