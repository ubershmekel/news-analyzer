import OpenAI from "openai";

import secrets from "../secrets.json";

const isDeepSeek = false;

const openai = new OpenAI({
  // apiKey: secrets.OPENAI_API_KEY,
  apiKey: isDeepSeek ? secrets.DEEPSEEK_API_KEY : secrets.OPENAI_API_KEY,
  baseURL: isDeepSeek ? "https://api.deepseek.com" : "https://api.openai.com",
});

// UnprocessableEntityError: 422 Failed to deserialize the JSON body into the target type: messages[0].role:
// unknown variant `developer`, expected one of `system`, `user`, `assistant`, `tool` at line 4 column 25
export async function ask(question: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      // { role: "developer", content: "You are a concise news editor." },
      { role: "system", content: "You are a concise news editor." },
      { role: "user", content: question },
    ],
    model: isDeepSeek ? "deepseek-chat" : "gpt-4o",
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
