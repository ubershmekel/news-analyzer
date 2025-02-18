import OpenAI from "openai";

import secrets from "./secrets.json";

interface ApiData {
  baseUrl: string;
  model: string;
  apiKey: string;
}

const apiData: { [key: string]: ApiData } = {
  openai: {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o",
    apiKey: secrets.OPENAI_API_KEY,
  },
  huggFace: {
    baseUrl: "https://huggingface.co/api/inference-proxy/together",
    model: "deepseek-ai/DeepSeek-V3",
    apiKey: secrets.HUGGINGFACE_API_KEY,
  },
  deepSeek: {
    baseUrl: "https://api.deepseek.com",
    model: "deepseek-chat",
    apiKey: secrets.DEEPSEEK_API_KEY,
  },
  openrouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    model: "deepseek/deepseek-r1",
    apiKey: secrets.OPENROUTER_API_KEY,
  },
};

const activeApi = apiData[secrets.ACTIVE_API];

const client = new OpenAI({
  // apiKey: secrets.OPENAI_API_KEY,
  apiKey: activeApi.apiKey,
  baseURL: activeApi.baseUrl,
});

// UnprocessableEntityError: 422 Failed to deserialize the JSON body into the target type: messages[0].role:
// unknown variant `developer`, expected one of `system`, `user`, `assistant`, `tool` at line 4 column 25
export async function ask(question: string) {
  const completion = await client.chat.completions.create({
    messages: [
      // { role: "developer", content: "You are a concise news editor." },
      { role: "system", content: "You are a concise news editor." },
      { role: "user", content: question },
    ],
    model: activeApi.model,
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
