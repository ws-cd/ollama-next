import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IDeleteModelBodyParams } from "@/lib/ollama";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

export interface IDeleteActionProps {
  name: string;
}

const query = async (body: IDeleteModelBodyParams) =>
  fetch("/api/delete", {
    method: "DELETE",
    body: JSON.stringify(body),
  });
export function DeleteAction({ name }: IDeleteActionProps) {
  const router = useRouter();
  const toast = useToast();
  const { isPending, mutate } = useMutation({
    mutationFn: query,
    onError: (error) =>
      toast.toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          (error as any)?.message ||
          "There was a problem with your copy request.",
      }),
    onSuccess: () => router.refresh(),
  });
  return (
    <Button
      size="sm"
      variant="outline"
      className="hover:text-destructive-foreground hover:bg-destructive"
      onClick={() => mutate({ name })}
    >
      {!isPending && <MdDeleteForever className="w-4 h-4" />}
      {isPending && <Loader className="w-4 h-4 animate-spin" />}
      <span className="sr-only">Delete</span>
    </Button>
  );
}
