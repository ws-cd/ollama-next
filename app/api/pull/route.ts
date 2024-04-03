import { pull } from "@/lib/ollama";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  const response = await pull(await res.json());
  return new NextResponse(response.body);
}
