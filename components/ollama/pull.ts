import { request } from "./reqquest";

export interface IPullBodyParams {
  name: string;
  stream: boolean;
}
export async function pull(body: IPullBodyParams) {
  const response = await request("/api/pull", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
}
