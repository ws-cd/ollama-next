import { deleteModel } from "@/lib/ollama";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function DELETE(res: NextRequest) {
  const body = await res.json();
  await deleteModel(body);
  revalidatePath("/models", "page");
  return Response.json({ revalidated: true, now: Date.now() });
}
