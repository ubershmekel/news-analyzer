import Parser from "rss-parser";

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const feeds = [
  { url: "https://moxie.foxnews.com/google-publisher/world.xml" },
  { url: "https://moxie.foxnews.com/google-publisher/latest.xml" },
  { url: "https://moxie.foxnews.com/google-publisher/us.xml" },
  { url: "https://feeds.bbci.co.uk/news/rss.xml" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml" },
];

const parser: Parser<CustomFeed, CustomItem> = new Parser();

(async () => {
  //   const feed = await parser.parseURL("https://www.reddit.com/.rss");
  const feed = await parser.parseURL(feeds[0].url);
  console.log(feed.title); // feed will have a `foo` property, type as a string
  console.log(feed.items.length);
  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link); // item will have a `bar` property type as a number
  });
})();
