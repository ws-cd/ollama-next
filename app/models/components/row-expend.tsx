"use client";
import { IShowTagBodyParams, IShowTagResponse } from "@/components/ollama";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export interface IRowExpendProps {
  name: string;
}

const query = async (body: IShowTagBodyParams): Promise<IShowTagResponse> => {
  const response = await fetch("/api/show", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
};

export function RowExpend({ name }: IRowExpendProps) {
  const { isLoading, data } = useQuery({
    queryKey: [name],
    queryFn: () => query({ name }),
    retry: 0,
    staleTime: 30 * 1000,
  });
  return (
    <TableRow role="contentinfo">
      <TableCell colSpan={6} className="p-4 bg-secondary">
        <div className="space-y-4 relative">
          <div className="space-y-2">
            <h3 className="text-md font-medium text-muted-foreground">
              Detail
            </h3>
            <p className="space-x-4">
              <span>family: {data?.details.family}</span>
              <span>families: {data?.details.families?.join(", ") || "-"}</span>
              <span>parameter_size: {data?.details.parameter_size}</span>
              <span>
                quantization_level: {data?.details.quantization_level}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium text-muted-foreground">
              Parameters
            </h3>
            <p className="space-x-4 whitespace-pre-wrap">{data?.parameters}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium text-muted-foreground">
              Template
            </h3>
            <p className="space-x-4">{data?.template}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium text-muted-foreground">
              Modelfile
            </h3>
            <p className="space-x-4 whitespace-pre-wrap">{data?.modelfile}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium text-muted-foreground">
              License
            </h3>
            <div className="space-x-4 whitespace-pre-wrap break-words">
              {data?.license}
            </div>
          </div>
          {isLoading && (
            <div className="space-y-2 absolute inset-0 flex flex-col bg-background p-2">
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
