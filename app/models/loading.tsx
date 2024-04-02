import { Skeleton } from "@/components/ui/skeleton";

export interface ITableListLoadingProps {}

export default function TableListLoading(props: ITableListLoadingProps) {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
    </div>
  );
}
