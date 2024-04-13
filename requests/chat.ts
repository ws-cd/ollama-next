import { readStream } from "@/lib/utils";
import { z } from "zod";

export interface IChatRequestBody {
  model: string;
  message: string;
}
export const ChatRequestBodySchema = z.object({
  model: z.string().min(1),
  message: z.string().min(1),
});

export async function fetchStreamChat(
  body: z.infer<typeof ChatRequestBodySchema>,
  callback: (value: string) => Promise<void> | void
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  await readStream(response.body, callback);
}
