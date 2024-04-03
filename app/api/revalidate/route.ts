import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  const body = await res.json();
  if (body.url) {
    revalidatePath(body.url, body.type);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }
  return NextResponse.json({ ok: true });
}
