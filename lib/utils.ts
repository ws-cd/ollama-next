import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function readStream(
  stream: ReadableStream<Uint8Array> | null | undefined,
  callback: (value: string) => Promise<void> | void
) {
  if (stream) {
    const reader = stream.getReader();
    while (1) {
      const textReader = new TextDecoder();
      const { done, value } = await reader.read();
      if (done) break;
      await callback(textReader.decode(value));
    }
  }
}
