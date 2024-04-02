import { showTag } from "@/components/ollama";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = await showTag(await req.json());
  return NextResponse.json(response);
}
