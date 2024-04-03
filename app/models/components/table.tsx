"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import humanFormat from "human-format";
import { Fragment, useCallback, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RowExpend } from "./row-expend";
import { Model } from "@/lib/ollama";
import { DeleteAction } from "./delete-action";
import { CopyAction } from "./copy-action";

export interface ITableListProps {
  models: Model[];
}

export function TableList({ models }: ITableListProps) {
  const [expends, setExpends] = useState<string[]>([]);

  const handleExpend = useCallback((name: string) => {
    setExpends((exps) => {
      const index = exps.findIndex((v) => v === name);
      return index > -1 ? exps.toSpliced(index, 1) : [...exps, name];
    });
  }, []);
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-6 text-center"></TableHead>
          <TableHead className="w-[220px]">Name</TableHead>
          <TableHead>Digest</TableHead>
          <TableHead className="w-[120px]">Size</TableHead>
          <TableHead className="w-[200px]">Modified At</TableHead>
          <TableHead className="w-[120px] text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map(({ name, modified_at, size, digest }) => (
          <Fragment key={name}>
            <TableRow className="cursor-pointer">
              <TableCell
                className="text-center"
                onClick={() => handleExpend(name)}
              >
                <IoIosArrowForward
                  className={cn("w-4 h-4 transition", {
                    "rotate-90": expends.includes(name),
                  })}
                />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{digest}</TableCell>
              <TableCell>{humanFormat(size)}</TableCell>
              <TableCell>
                {dayjs(modified_at).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <CopyAction name={name} />
                <DeleteAction name={name} />
              </TableCell>
            </TableRow>
            {expends.includes(name) && <RowExpend name={name} />}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
