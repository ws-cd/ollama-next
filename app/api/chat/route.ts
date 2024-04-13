import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatRequestBodySchema } from "@/requests/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const validated = ChatRequestBodySchema.safeParse(await req.json());
  if (validated.success) {
    const { model, message } = validated.data;
    const chat = new ChatOllama({
      baseUrl: process.env.BASE_URL,
      model,
    });
    const chain = chat.pipe(new StringOutputParser());

    const stream = await chain.stream(message);
    const response = new NextResponse(stream);
    return response;
  }
  return NextResponse.json({ messgae: "somethin is error" }, { status: 400 });
}
