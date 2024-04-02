import { listTags } from "@/components/ollama";
import { TableList } from "./components/table";

export interface IModelsPageProps {}

export default async function ModelsPage(props: IModelsPageProps) {
  const data = await listTags();
  return <TableList models={data.models} />;
}
