import { request } from "./reqquest";

export interface ModelDetail {
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;
}
export interface Model {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: ModelDetail;
}
export interface IListTagsResponse {
  models: Model[];
}
export async function listTags(): Promise<IListTagsResponse> {
  const response = await request("/api/tags");
  return await response.json();
}

export interface IShowTagBodyParams {
  name: string;
}
export interface IShowTagResponse {
  license: string;
  modelfile: string;
  parameters: string;
  template: string;
  details: ModelDetail;
}
export async function showTag(
  body: IShowTagBodyParams
): Promise<IShowTagResponse> {
  const response = await request("/api/show", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

export interface IPullBodyParams {
  name: string;
  stream: boolean;
}
export async function pull(body: IPullBodyParams) {
  return request("/api/pull", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface IDeleteModelBodyParams {
  name: string;
}
export async function deleteModel(body: IDeleteModelBodyParams) {
  await request("/api/delete", {
    method: "DELETE",
    body: JSON.stringify(body),
  });
  return { ok: true };
}

export interface ICopyModelBodyParams {
  source: string;
  destination: string;
}
export async function copyModel(body: ICopyModelBodyParams) {
  await request("/api/copy", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return { ok: true };
}

export interface IChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
export interface IChatParams {
  model: string;
  messages: IChatMessage[];
}
export async function chat(body: IChatParams) {
  return request("/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
