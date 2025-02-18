import { promises as fs } from "fs";
import { ask } from "./ai";
import {
  summarySpans,
  type FrontPageSummaries,
  type NewsItem,
  type NewsLink,
  type SpanSummary,
} from "@news-analyzer/shared/serverTypes";
import {
  getCronRunId,
  getSummariesFromDates,
  getFirstStoryDate,
  getLastStoryDate,
  getLinkIdsToUrls,
  getStories,
  getStoriesFromDate,
  insertSummary,
  getUniqueSummariesFromDates,
} from "./db";
import { storiesTable } from "./db/schema";

const summarizeOneDayPrompt = `Please summarize the top 5 stories from the following list.
You will output 5 lines.
Each output line will be the most important, unique, impactful, or interesting story that you can summarize from the input list.
Make sure the lines have no overlap, are not repetitive or redundant.
Each line in the input list starts with a number story ID.
Each output line should start with the title, do not start with a numbering.
Do not use any markdown or special characters in the output lines.
Add at the end of each output line a list of up to 10 relevant story IDs separated by commas in parenthesis like (4, 15, 97) or (10, 29, 35, 421, 507)
The input list is as follows:
`;

const summarizeDailySummariesPrompt = `Please summarize the top 5 stories from the following list.
Each input line starts with the publish date, followed by the story title.
Each input line ends with a list of up to 10 relevant story IDs separated by commas in parenthesis like (4, 15, 97) or (10, 29, 35, 421, 507)
You will output 5 lines.
Each output line will be the most important, unique, impactful, or interesting story that you can summarize from the input list.
If a story appeared on multiple days, then it's probably important.
Each output line should be a rephrased summary, especially if the story appeared on multiple days.
Each output line should NOT be "summary: full title" instead just write the title as a sentence.
Each output line should start with the title, do not start with a numbering.
Each output line should end with a list of up to 10 relevant story IDs separated by commas in parenthesis like (4, 15, 97) or (10, 29, 35, 421, 507)
Each output line should have no overlap with others, and not be repetitive or redundant.
Do not use any markdown or special characters in the output lines.

The input lines are:
`;

const exampleAnswer = `1) Israel and Hamas reach a significant deal to release hostages and facilitate Palestinian return to Gaza, showcasing a thaw in tensions. (5, 251, 223)
2) Belarus' President Lukashenko extends his rule following disputed elections criticized by the opposition and EU. (2, 236, 204)
3) 13 UN peacekeepers and soldiers die as M23 rebels gain ground in Congo, highlighting ongoing instability in the region. (6, 240, 118)
4) Palestinians return to northern Gaza, illustrating shifts in territorial access amid cease-fire negotiations with Israel. (4, 238, 144)
`;

const exampleMultiDaySummary = `Hamas Releases and Trades Hostages with Israel Amidst Ceasefire: Hamas releases four female hostages as part of a ceasefire deal with Israel, while Israel frees 200 Palestinian prisoners in a simultaneous exchange, highlighting ongoing tensions and negotiations in the region. (17,223,218,222,225)
Quebec's Religious Symbols Ban Faces Supreme Court Challenge: A legal battle looms as Quebec's prohibition on wearing religious symbols is set to be tested at the Supreme Court, potentially impacting freedom of expression and religious rights in Canada. (226)
China's DeepSeek AI Disrupts Tech Sector: China's AI application DeepSeek is shaking up the industry and challenging America's tech dominance, raising concerns in the markets. (77,112,153,189,433,141,142,154,155,360)
Maha Kumbh Festival Tragedy: At least 30 people died in a stampede during India’s Maha Kumbh festival, raising safety concerns. (452,558,607,673,680,718,868)
DC Plane Crash: A midair collision involving an American Airlines jet and a military helicopter near Washington, resulting in 67 fatalities, underscores aviation safety concerns. (692,719,730,738,766,819,842)`;

function promptifyStories(stories: (typeof storiesTable.$inferSelect)[]) {
  const storyLines: string[] = [summarizeOneDayPrompt];
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
    res.ids = match[1].split(",").map((id) => id.trim());
    const lineNoIds = line.replace(match[0], "");
    // remove leading number and space
    let cleanLine = lineNoIds.replace(/^\d+\)\s+/, "").trim();
    // remove trailing space and periods
    cleanLine = cleanLine.replace(/[\s\.]+$/, "");
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
  // const startDate = await getFirstStoryDate();
  const lastDate = await getLastStoryDate();
  // iterate over days since startDate
  //   const startDate = "2025-01-29";

  let i = -1;
  while (true) {
    i += 1;
    const when = new Date(lastDate);
    when.setDate(when.getDate() + i);
    const result = await generateDaySummary(when);
    if (!result) {
      break;
    }
  }
}

export async function generateDayTodayAndYesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  await generateDaySummary(today);
  await generateDaySummary(yesterday);
}

// generateDaySummary returns `false` if this day had no stories
async function generateDaySummary(when: Date): Promise<boolean> {
  const stories = await getStoriesFromDate(when);
  if (stories.length === 0) {
    console.log(`No stories from ${when}`);
    return false;
  }
  if (stories.length <= 10) {
    console.log(`Stories from ${when}: ${stories.length} so skipping`);
    return true;
  }
  console.log(`Stories from ${when}: ${stories.length}`);
  const textQuestion = promptifyStories(stories);
  console.log(`Asking: ${textQuestion.length} character long question`);
  const result = await ask(textQuestion);
  const resText = result.message.content;
  if (!resText) {
    console.error(`No response from AI for ${when}`);
    return true;
  }
  console.log(resText);
  for (const line of resText.split("\n")) {
    const { lineNoIds, ids } = splitStoryIds(line);
    if (lineNoIds.length === 0) {
      console.log(`Skipping empty line`);
      continue;
    }

    await insertSummary({
      publishDate: when,
      title: lineNoIds,
      urlIds: ids.join(","),
      generatedDate: new Date(),
      daysIncluded: 0,
      runId: await getCronRunId(),
    });
  }
  // console.log(stories[0]);
  // console.log(stories[1]);
  // console.log(stories[2]);
  return true;
}

async function markdownDailySummaries(startDate: Date, endDate: Date) {
  // const summaries = await getAllDailySummaries();
  const summaries = await getSummariesFromDates(startDate, endDate);

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

async function generateXDaysBackSummary(days: number) {
  const startDate = new Date();
  const items = await generateMultiDaySummary(days);

  for (const item of items) {
    await insertSummary({
      publishDate: startDate,
      title: item.title,
      urlIds: item.links.map((li) => li.id).join(","),
      generatedDate: new Date(),
      daysIncluded: days,
      runId: await getCronRunId(),
    });
  }

  return items;
}

export async function generateFrontPageSummaries(): Promise<FrontPageSummaries> {
  const out: FrontPageSummaries = {
    createdAt: new Date().toISOString(),
    summaries: [],
  };
  for (const span of summarySpans) {
    console.log("Generating", span.name);
    const items: NewsItem[] = await generateXDaysBackSummary(span.daysBack);
    const newsSpan: SpanSummary = {
      daysBack: span.daysBack,
      name: span.name,
      items,
    };
    out.summaries.push(newsSpan);
  }
  return out;
}

async function generateMultiDaySummary(daysBack: number) {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - daysBack);
  console.log(`Summarizing from ${startDate} to ${endDate}`);
  const summaries = await getUniqueSummariesFromDates(startDate, endDate);
  const questionLines: string[] = [summarizeDailySummariesPrompt];
  if (summaries.length === 0) {
    console.log(`No summaries from ${startDate} to ${endDate}`);
    throw new Error("No summaries");
  }
  for (const summary of summaries) {
    const formattedDate = summary.publishDate.toISOString().split("T")[0];
    questionLines.push(`${formattedDate} ${summary.title} (${summary.urlIds})`);
  }
  const textQuestion = questionLines.join("\n");

  // log textQuestion for debug purposes
  await fs.writeFile(`./data/question-${daysBack}.txt`, textQuestion, "utf8");
  console.log(`Summarizing ${summaries.length} summaries`);
  console.log(`Asking: ${textQuestion.length} character long question`);

  const result = await ask(textQuestion);
  const answer = result.message.content;
  if (!answer) {
    console.error("No answer from AI");
    throw new Error("No answer from AI");
  }
  // console.log(answer);
  // // const multiDaySummaryText = await formatMultiDaySummary(answer);
  // // console.log(multiDaySummaryText);
  // return multiDaySummaryText;
  return await parseMultiDaySummary(answer);
}

async function parseMultiDaySummary(answer: string) {
  const out: NewsItem[] = [];
  const allLinkIds: number[] = [];

  // Get all URL ids so that we can fetch all their URLs
  for (const line of answer.split("\n")) {
    const { lineNoIds, ids } = splitStoryIds(line);
    if (lineNoIds.length === 0) {
      console.log(`Skipping empty line`);
      continue;
    }
    for (const id of ids) {
      allLinkIds.push(parseInt(id));
    }
  }
  const linkIdToUrl = await getLinkIdsToUrls(allLinkIds);

  // Parse the answer and create NewsItems
  for (const line of answer.split("\n")) {
    const { lineNoIds, ids } = splitStoryIds(line);
    if (lineNoIds.length === 0) {
      console.log(`Skipping empty line`);
      continue;
    }
    const seenUrls: Set<string> = new Set();
    const uniqueIds = [...new Set(ids)].sort();
    const links: NewsLink[] = [];
    for (const id of uniqueIds) {
      const url = linkIdToUrl[id];
      if (!url) {
        console.warn(`No URL for ${id}`);
        continue;
      }
      if (seenUrls.has(url)) {
        continue;
      }
      seenUrls.add(url);
      const link: NewsLink = {
        id: parseInt(id),
        url: linkIdToUrl[id],
      };
      links.push(link);
    }
    const newsItem: NewsItem = {
      title: lineNoIds,
      links,
    };
    out.push(newsItem);
  }
  return out;
}

async function formatMultiDaySummary(answer: string) {
  const allLinkIds: number[] = [];
  const outLines: string[] = [];
  for (const line of answer.split("\n")) {
    const { lineNoIds, ids } = splitStoryIds(line);
    if (lineNoIds.length === 0) {
      console.log(`Skipping empty line`);
      continue;
    }
    for (const id of ids) {
      allLinkIds.push(parseInt(id));
    }
  }
  const linkIdToUrl = await getLinkIdsToUrls(allLinkIds);

  for (const line of answer.split("\n")) {
    const { lineNoIds, ids } = splitStoryIds(line);
    if (lineNoIds.length === 0) {
      console.log(`Skipping empty line`);
      continue;
    }
    const urlParts: string[] = [];
    // const ids = summary.urlIds.split(",").map((id) => parseInt(id));
    const seenUrls: Set<string> = new Set();
    for (const id of ids) {
      const url = linkIdToUrl[id];
      if (seenUrls.has(url)) {
        continue;
      }
      seenUrls.add(url);
      urlParts.push(`[${id}](${url})`);
    }
    const urlSection = urlParts.join(", ");
    const out = `* ${lineNoIds} (${urlSection})`;
    // console.log(out);
    outLines.push(out);
  }
  return outLines.join("\n");
}

async function main() {
  // await markdownDailySummaries();
  //   await summarizeAll();
  // await summarizeDates();
  // await formatMultiDaySummary(exampleMultiDaySummary);

  const out = await generateMultiDaySummary(2);
  console.log(out);

  // await markdownDailySummaries(yesterday, now);
  // const startDate = new Date("2025-01-25");

  // await summarizeTodayAndYesterday();
  // const startDate = await getFirstStoryDate();
  // const endDate = await getLastStoryDate();
  // await generateMultiDaySummary(startDate, endDate);
}

if (require.main === module) {
  main();
}
