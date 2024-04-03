import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ICopyModelBodyParams } from "@/lib/ollama";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Copy, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import { z } from "zod";

export interface ICopyActionProps {
  name: string;
}

const formSchema = z.object({
  destination: z.string().min(1),
});

const query = async (body: ICopyModelBodyParams) =>
  fetch("/api/copy", {
    method: "POST",
    body: JSON.stringify(body),
  });
export function CopyAction({ name }: ICopyActionProps) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { destination: `${name}-copy` },
  });
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const { mutateAsync } = useMutation({ mutationFn: query });
  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          await mutateAsync({ ...data, source: name });
          setOpen(false);
          router.refresh();
        } catch (error) {
          toast.toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              (error as any)?.message ||
              "There was a problem with your copy request.",
          });
        }
      }),
    [handleSubmit, name]
  );
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button size="sm" variant="ghost">
          <Copy className="w-4 h-4" />
          <span className="sr-only">Copy</span>
        </Button>
      </DialogTrigger>
      <DialogContent hiddenCloseIcon className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Delete a Model</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="destination">Copy Name</Label>
            <Input
              id="destination"
              placeholder="Type copied name"
              {...register("destination")}
            />
            {errors.destination && (
              <p className="text-destructive text-sm">
                {errors.destination.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader className="w-4 h-4 animate-spin mr-1" />}
              Submit
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
