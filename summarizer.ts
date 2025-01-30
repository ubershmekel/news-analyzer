import { text } from "stream/consumers";
import { ask } from "./ai";
import { getStories } from "./db";

const bigPrompt = `Please summarize the top 5 stories from the following list.
You will output 5 lines.
Each output line will be the most important, unique, impactful, or interesting story that you can summarize from the input list.
Make sure the lines have no overlap, are not repetitive or redundant.
Each line in the input list starts with a number story ID.
Add at the end of each output line a list of 1 to 10 relevant story IDs separated by commas in parenthesis like so: (4, 15, 97)
The input list is as follows:
`;

const exampleAnswer = `1) Israel and Hamas reach a significant deal to release hostages and facilitate Palestinian return to Gaza, showcasing a thaw in tensions. (5, 251, 223)
2) Belarus' President Lukashenko extends his rule following disputed elections criticized by the opposition and EU. (2, 236, 204)
3) 13 UN peacekeepers and soldiers die as M23 rebels gain ground in Congo, highlighting ongoing instability in the region. (6, 240, 118)
4) Palestinians return to northern Gaza, illustrating shifts in territorial access amid cease-fire negotiations with Israel. (4, 238, 144)
`;

async function summarize() {
  const stories = await getStories();
  console.log(`${stories.length} stories`);
  const storyLines: string[] = [bigPrompt];
  for (const story of stories) {
    storyLines.push(`${story.id}): ${story.title}`);
  }
  const textQuestion = storyLines.join("\n");
  console.log(`Asking: ${textQuestion.length} character long question`);
  const result = await ask(textQuestion);
  console.log(result.message.content);
  return result.message.content;
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
      linkifiedLines.push(lineNoIds);
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

async function main() {
  const summary = (await summarize()) as string;
  console.log(summary);
  const linkedSummary = await linkify(summary);
  console.log("-------");
  console.log(linkedSummary);
}

if (require.main === module) {
  main();
}
