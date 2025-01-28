import Parser from "rss-parser";
import fs from "fs";
import { insertStory } from "./db";

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

interface Feed {
  url: string;
  name: string;
}

const feeds = [
  {
    name: "fox-world",
    url: "https://moxie.foxnews.com/google-publisher/world.xml",
  },
  {
    name: "fox-latest",
    url: "https://moxie.foxnews.com/google-publisher/latest.xml",
  },
  { name: "fox-us", url: "https://moxie.foxnews.com/google-publisher/us.xml" },
  { name: "bbc-news", url: "https://feeds.bbci.co.uk/news/rss.xml" },
  { name: "bbc-world", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  {
    name: "nyt-home",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  },
  {
    name: "nyt-world",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  },
];

const parser: Parser<CustomFeed, CustomItem> = new Parser();

async function main() {
  //   const feed = await parser.parseURL("https://www.reddit.com/.rss");
  for (const feed of feeds) {
    const feedXml = await parser.parseURL(feed.url);
    console.log(feedXml.title); // feed will have a `foo` property, type as a string
    // save a json copy of the feed to a file
    // fs.writeFileSync("./feed.json", JSON.stringify(feed));

    console.log(feedXml.items.length);
    feedXml.items.forEach((item) => {
      console.log(item.title + ":" + item.link); // item will have a `bar` property type as a number
      insertStory({
        title: item.title as string,
        url: item.link as string,
        rssName: feed.name,
        publishDate: new Date(item.pubDate as string),
        crawlDate: new Date(),
      });
    });
  }
}

if (require.main === module) {
  main();
}
