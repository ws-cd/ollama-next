import { listTags } from "@/lib/ollama";
import Chat from "./components/Chat";

const ChatPage = async () => {
  const tags = await listTags();
  const models = tags.models.map((m) => m.name);
  return (
    <section className="container mx-auto mt-12">
      <Chat models={models} />
    </section>
  );
};

export default ChatPage;
