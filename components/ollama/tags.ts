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
