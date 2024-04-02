import { GoPackage } from "react-icons/go";

import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
export interface IModelsLyoutProps {}

export default function ModelsLyout({
  children,
}: PropsWithChildren<IModelsLyoutProps>) {
  return (
    <>
      <div className="sticky top-14 pt-8 px-8 bg-background z-10">
        <div className="border-b border-border pb-4 flex justify-between items-end">
          <div className="space-y-4 hidden lg:block">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <GoPackage className="w-6 h-6" />
              Manage Models Page
            </h2>
            <p>A manage the Ollama models page. You can pull, push...</p>
          </div>
          <div className="flex items-center gap-4">
            <Button>Pull</Button>
            <Button>Push</Button>
            <Button className="bg-green-700 hover:bg-green-600 text-white">
              Create
            </Button>
            <Button variant="secondary">Refresh</Button>
          </div>
        </div>
      </div>
      <section className="space-y-8 pt-4 px-8 overflow-x-hidden">
        {children}
      </section>
    </>
  );
}
