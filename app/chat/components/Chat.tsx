"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChatRequestBodySchema, fetchStreamChat } from "@/requests/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendHorizonalIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { nan, z } from "zod";
import { nanoid } from "nanoid";
import { cloneDeep, keyBy } from "lodash-es";
import { cn } from "@/lib/utils";

interface ChatProps {
  models: string[];
}
type Message = {
  id: string;
  content: string;
  type: "ai" | "user";
};
const Chat = ({ models }: ChatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const form = useForm<z.infer<typeof ChatRequestBodySchema>>({
    resolver: zodResolver(ChatRequestBodySchema),
    defaultValues: { model: "llama2:7b-chat", message: "" },
  });
  const onSubmit = useMemo(
    () =>
      form.handleSubmit(async (data) => {
        setMessages((ms) => [
          ...ms,
          { id: nanoid(), content: data.message, type: "user" },
        ]);
        form.resetField("message");
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
          }
        });

        const id = nanoid();
        await fetchStreamChat(data, (value) => {
          setMessages((ms) => {
            const map = keyBy(cloneDeep(ms), "id");
            if (map[id]) {
              map[id].content += value;
              return Object.values(map);
            }
            return [...ms, { id, content: value, type: "ai" }];
          });

          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
          }
        });
        setTimeout(() => {
          inputRef.current?.focus();
        });
      }),
    []
  );
  const { ref, ...rest } = form.register("message");
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="py-2 flex items-center gap-4 space-y-0">
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="flex-1 max-w-sm">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <ScrollArea
          className="h-[calc(100vh_-_13.5rem)] rounded-md border px-4 py-2"
          viewPortRef={scrollRef}
        >
          {messages.map(({ id, content, type }) => (
            <div
              key={id}
              className={cn("flex mt-2", {
                "justify-end": type === "user",
              })}
            >
              <div
                className={cn(
                  "py-2 px-4 rounded whitespace-pre-wrap",
                  type === "ai"
                    ? "bg-muted"
                    : "text-sky-700 font-bold underline"
                )}
              >
                {content}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="py-2 flex items-center gap-4">
          <Input
            placeholder="type your question"
            className="flex-1"
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <LoaderIcon className="animate-spin w-4 h-4" />
            )}
            {!form.formState.isSubmitting && (
              <SendHorizonalIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Chat;
