"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface IRefreshActionProps {}

export function RefreshAction(props: IRefreshActionProps) {
  const router = useRouter();
  return (
    <Button variant="secondary" onClick={() => router.refresh()}>
      Refresh
    </Button>
  );
}
