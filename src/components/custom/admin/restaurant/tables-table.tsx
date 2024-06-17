"use client";

import { getTablesData } from "@/actions/admin/tables-crud";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableNoDataAvailable,
  TableRow,
  TableSkeleton,
} from "@/components";
import { defaultPaginationData } from "@/constants";
import { cn } from "@/lib/utils";
import { setAllTables, setCurrentTable } from "@/states/admin/tables-slice";
import { AdminState } from "@/states/stores";
import { tablesDataTypes } from "@/types";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// Tables table column headers
const tablesTableHeaders = [
  {
    name: "Table ID",
    className: "",
  },
  {
    name: "Table Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Description",
    className: "hidden sm:table-cell",
  },
  {
    name: "Price(USD)",
    className: "text-right",
  },
];

export const AdminTablesTable: FC<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}> = ({ isLoading, setIsLoading }) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  // is error
  const [isError, setIsError] = useState(false);
  // dispatcher
  const dispatch = useDispatch();
  const tables = useSelector((state: AdminState) => state.tables_admin);
  const [tableId, setTableId] = useState<string>("new");
  const [paginationData, setPaginationData] = useState(defaultPaginationData);

  // load tables data
  const loadTablesData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    // fetch tables data from the server
    await getTablesData(pageInt)
      .then((data) => {
        if (data?.tables) {
          dispatch(setAllTables(data.tables as tablesDataTypes[]));
          setPaginationData({
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
          });
        }
        if (data?.error) {
          setIsError(true);
          dispatch(setAllTables(null));
          setPaginationData(defaultPaginationData);
        }
      })
      .catch(() => {
        setIsError(true);
        dispatch(setAllTables(null));
        setPaginationData(defaultPaginationData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, setIsLoading]);

  // load tables data on component mount
  useEffect(() => {
    loadTablesData();
  }, [loadTablesData]);

  // change set data
  useEffect(() => {
    if (tables.all && tableId) {
      const table = tables.all.find((table) => table.tableId === tableId);
      if (table) {
        dispatch(setCurrentTable(table));
      } else {
        dispatch(setCurrentTable(null));
      }
    }
  }, [dispatch, tableId, tables]);

  return (
    <Card className="overflow-hidden xl:col-span-2">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="">
            <CardTitle className="text-lg">Tables Data</CardTitle>
            <CardDescription>
              Tables details of The Villa Hotel.
            </CardDescription>
          </div>

          <Button variant="default" onClick={() => setTableId("new")}>
            Add Table
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden px-5">
        {/*  if tables are not available  */}
        {(tables.all?.length == 0 || tables.all == null) &&
          !isLoading &&
          !isError && <TableNoDataAvailable />}

        {/* is error occurred */}
        {isError && (
          <div className="flex flex-col items-center justify-center text-center text-red-500">
            <BiSolidError className="h-20 w-20" />
            Failed to load tables data!
          </div>
        )}

        {/* if tables data are loading */}
        {isLoading && <TableSkeleton />}

        {/* if tables data are available */}
        {tables.all && tables.all?.length > 0 && !isLoading && (
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                {tablesTableHeaders.map((header) => (
                  <TableHead key={header.name} className={header.className}>
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-hidden">
              {tables.all.map((data, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    data.tableId.toString() === tableId ? "bg-emerald-100" : "",
                  )}
                  onClick={() => setTableId(data.tableId.toString())}
                >
                  <TableCell className="">
                    <div className="font-medium">{data?.tableId}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">
                      {data?.tableType.replaceAll("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden max-w-96 sm:table-cell xl:max-w-80 2xl:max-w-96">
                    <p className="w-full truncate">{data?.description}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    $ {data?.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* pagination */}
        {tables.all && tables.all?.length > 0 && !isLoading && (
          <div className="flex w-full justify-end pt-5">
            <Pagination className="flex w-full justify-end pt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={paginationData.currentPage === 1}
                    href={`/admin/restaurant?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationData.currentPage === paginationData.totalPages
                    }
                    href={`/admin/restaurant?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
