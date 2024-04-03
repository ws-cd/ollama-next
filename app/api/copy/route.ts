import { copyModel } from "@/lib/ollama";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(res: NextRequest) {
  const body = await res.json();
  await copyModel(body);
  revalidatePath("/models", "page");
  return Response.json({ revalidated: true, now: Date.now() });
}
