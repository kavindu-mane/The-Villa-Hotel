"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Skeleton,
} from "@/components";
import { FC } from "react";

export const TableSkeleton: FC<{ cols?: number }> = ({ cols = 5 }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="!border-b-0">
          {[...Array(cols)].map((_, index) => {
            return (
              <TableHead
                key={"header_" + index}
                className={`${![0, cols - 1].includes(index) ? "hidden sm:table-cell" : ""}`}
              >
                <Skeleton className="h-10 w-full rounded-lg bg-gray-300" />
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={"row_" + index} className={"border-b-0"}>
            {[...Array(cols)].map((_, index) => {
              return (
                <TableCell
                  key={"cell_" + index}
                  className={`${![0, cols - 1].includes(index) ? "hidden sm:table-cell" : ""}`}
                >
                  <Skeleton className="h-10 w-full rounded-lg" />
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
