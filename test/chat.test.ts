import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2:7b-chat",
});

const chain = model.pipe(new StringOutputParser());
const stream = await chain.stream("hello");

for await (const chunk of stream) {
  console.log(chunk);
}
