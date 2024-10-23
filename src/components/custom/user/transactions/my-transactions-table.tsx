"use client";

import { getTransactions } from "@/actions/user/my-reservations";
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
  TableRow,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { defaultPaginationData } from "@/constants";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

// rooms table column headers
const transactionsTableHeaders = [
  {
    name: "Reservation ID",
    className: "",
  },
  {
    name: "Payment Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Amount",
    className: "hidden sm:table-cell",
  },
  {
    name: "Date",
    className: "hidden sm:table-cell",
  },
  {
    name: "Room Number",
    className: "text-right",
  },
];

export const MyTransactionsTable: FC = () => {
  const [transactionsData, setTransactionsData] = useState<any[] | null>(null);
  const [paginationDataRooms, setPaginationDataRooms] = useState(
    defaultPaginationData,
  );
  const { toast } = useToast();
  const params = useSearchParams();
  const page = params.get("page") || "1";

  const getData = useCallback(async () => {
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    await getTransactions(pageInt)
      .then((data) => {
        if (data.transactions) {
          setTransactionsData(data.transactions);
        }
        setPaginationDataRooms({
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || 1,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to get reservations",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      });
  }, [page, toast]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="w-full">
      <h1 className="mb-5 text-lg font-medium">My Reservations</h1>

      <Card>
        <CardHeader className="px-5">
          <CardTitle>My Transactions</CardTitle>
          <CardDescription>
            My Recent reservations from The Villa Hotel.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5">
          <Table>
            <TableHeader>
              <TableRow>
                {transactionsTableHeaders.map((header) => (
                  <TableHead key={header.name} className={header.className}>
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData &&
                transactionsData?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">
                        {data?.roomreservation?.reservationNo}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className={cn(
                          "text-xs",
                          data?.paymentType !== "Online" ? "bg-slate-900" : "",
                        )}
                        variant="default"
                      >
                        {data?.paymentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      ${data?.amount}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(data?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {data?.roomreservation?.room?.number}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* pagination */}
      <div className="flex w-full justify-end pt-5">
        <Pagination className="flex w-full justify-end pt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                isActive={paginationDataRooms.currentPage === 1}
                href={`/user/reservations?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                isActive={
                  paginationDataRooms.currentPage ===
                  paginationDataRooms.totalPages
                }
                href={`/user/reservations?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
