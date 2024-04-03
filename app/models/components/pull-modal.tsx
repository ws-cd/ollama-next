"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { uniqBy } from "lodash-es";

const formSchema = z.object({
  name: z.string().min(1),
});

interface Status {
  status?: string;
  error?: string;
}

export interface IPullModalProps {}

export function PullModal(props: IPullModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const [status, setStatus] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      form.reset();
      setStatus([]);
      setIsLoading(false);
    }
  }, [open, form]);

  const toast = useToast();

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(async (data) => {
        setIsLoading(true);
        setStatus([]);
        try {
          const response = await fetch("/api/pull", {
            method: "POST",
            body: JSON.stringify({ ...data, stream: true }),
          });
          if (response.body) {
            const textReader = new TextDecoder();
            for await (const chunk of response.body as any) {
              const sts = Array.from(
                new Set(textReader.decode(chunk).split("\n").filter(Boolean))
              ).map((t) => JSON.parse(t));
              setStatus((s) => uniqBy([...s, ...sts], "status"));
              setTimeout(() => {
                if (ref.current)
                  ref.current.scrollTop = ref.current.scrollHeight;
              }, 200);
            }
          }
          await fetch("/api/revalidate", {
            method: "POST",
            body: JSON.stringify({ url: "/models", type: "page" }),
          });
        } catch (error) {
          toast.toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              (error as any)?.message ||
              "There was a problem with your pull request.",
          });
        } finally {
          setIsLoading(false);
        }
      }),
    [form]
  );
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button>Pull</Button>
      </DialogTrigger>
      <DialogContent hiddenCloseIcon className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pull a Model</DialogTitle>
          <DialogDescription>
            We will pull the model on&nbsp;
            <Link href="https://ollama.com/library" className="underline">
              Ollama.com
            </Link>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Model</Label>
            <Input
              id="name"
              placeholder="Type model name."
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader className="w-4 h-4 mr-1 animate-spin" />}
            <span>Pull</span>
          </Button>
          <div className="px-2 rounded bg-secondary text-sm" ref={ref}>
            {status.map((s, i) => (
              <p
                key={i}
                className={cn("break-words pb-1", {
                  "text-destructive": !!s.error,
                })}
              >
                {s.status || s.error || "-"}
              </p>
            ))}
          </div>
        </form>
        {!isLoading && (
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
