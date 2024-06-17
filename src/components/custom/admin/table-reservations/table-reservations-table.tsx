"use client";

import { getTableReservationsData } from "@/actions/admin/table-reservations-crud";
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
import {
  setAllTableReservations,
  setCurrentTableReservation,
} from "@/states/admin";
import { AdminState } from "@/states/stores";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// tables table column headers
const tablesTableHeaders = [
  {
    name: "Reservation No.",
    className: "",
  },
  {
    name: "Table Number",
    className: "hidden sm:table-cell",
  },
  {
    name: "Table Type",
    className: "text-right",
  },
  {
    name: "Status",
    className: "hidden sm:table-cell",
  },
  {
    name: "Date",
    className: "hidden sm:table-cell",
  },
  {
    name: "Time Slot",
    className: "hidden sm:table-cell",
  },
];

export const AdminTableReservationTable: FC<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}> = ({ isLoading, setIsLoading }) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  // is error
  const [isError, setIsError] = useState(false);
  // dispatcher
  const dispatch = useDispatch();
  const tables = useSelector(
    (state: AdminState) => state.tables_reservation_admin,
  );
  const [tableReservationId, setTableReservationId] = useState<string>("new");
  const [paginationData, setPaginationData] = useState(defaultPaginationData);

  // load tables reservations data
  const loadReservationsData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    // fetch tables data from the server
    await getTableReservationsData(pageInt)
      .then((data) => {
        if (data?.reservations) {
          dispatch(setAllTableReservations(data?.reservations));
          setPaginationData({
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
          });
        }
        if (data?.error) {
          setIsError(true);
          dispatch(setAllTableReservations(null));
          setPaginationData(defaultPaginationData);
        }
      })
      .catch(() => {
        setIsError(true);
        dispatch(setAllTableReservations(null));
        setPaginationData(defaultPaginationData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, setIsLoading]);

  // load tables reservations data on component mount
  useEffect(() => {
    loadReservationsData();
  }, [loadReservationsData]);

  // change set data
  useEffect(() => {
    if (tables.all && tableReservationId) {
      const table = tables.all.find(
        (table) => table.reservationNo.toString() === tableReservationId,
      );
      if (table) {
        dispatch(setCurrentTableReservation(table));
      } else {
        dispatch(setCurrentTableReservation(null));
      }
    }
  }, [dispatch, tableReservationId, tables]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="">
            <CardTitle className="text-lg">Table Reservation Data</CardTitle>
            <CardDescription>
              Table reservation details of The Villa Restaurant.
            </CardDescription>
          </div>

          <Button
            variant="default"
            onClick={() => setTableReservationId("new")}
          >
            Add Reservations
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-5">
        {/*  if tables are not available  */}
        {(tables.all?.length == 0 || tables.all == null) &&
          !isLoading &&
          !isError && <TableNoDataAvailable />}

        {/* is error occurred */}
        {isError && (
          <div className="flex flex-col items-center justify-center text-center text-red-500">
            <BiSolidError className="h-20 w-20" />
            Failed to load tables reservation data!
          </div>
        )}

        {/* if tables data are loading */}
        {isLoading && <TableSkeleton />}

        {/* if tables data are available */}
        {tables.all && tables.all?.length > 0 && !isLoading && (
          <Table>
            <TableHeader>
              <TableRow>
                {tablesTableHeaders.map((header) => (
                  <TableHead key={header.name} className={header.className}>
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables.all.map((data, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    data.reservationNo.toString() === tableReservationId
                      ? "bg-emerald-100"
                      : "",
                  )}
                  onClick={() =>
                    setTableReservationId(data.reservationNo.toString())
                  }
                >
                  <TableCell>
                    <div className="font-medium">
                      {data?.reservationNo.toString().padStart(4, "0")}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">{data?.table.tableId}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">
                      {data?.table.tableType.replaceAll("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="default"
                      className={`${data.status === "Cancelled" ? "bg-red-500" : ""}`}
                    >
                      {data?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {format(data?.date, "LLL dd, y")}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data?.timeSlot
                      .split("(")[1]
                      .replace(")", "")
                      .replace("(", "")}
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
                    href={`/admin/table-reservations?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationData.currentPage === paginationData.totalPages
                    }
                    href={`/admin/table-reservations?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
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
