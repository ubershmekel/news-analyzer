import OpenAI from "openai";

import secrets from "./secrets.json";

const openai = new OpenAI({
  apiKey: secrets.OPENAI_API_KEY,
});

export async function ask(question: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "developer", content: "You are a concise news editor." },
      { role: "user", content: question },
    ],
    model: "gpt-4o",
    store: true,
  });

  return completion.choices[0];
}

async function main() {
  console.log(await ask("What is the most important news today?"));
}

if (require.main === module) {
  main();
}
