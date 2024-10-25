"use client";

import { getRoomReservationsData } from "@/actions/admin/room-reservations-crud";
import { getTableReservationsData } from "@/actions/admin/table-reservations-crud";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";

// rooms table column headers
const roomsTableHeaders = [
  {
    name: "Reservation No.",
    className: "",
  },
  {
    name: "Room Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Status",
    className: "hidden sm:table-cell",
  },
  {
    name: "Check In",
    className: "hidden sm:table-cell",
  },
  {
    name: "Check Out",
    className: "hidden sm:table-cell",
  },
  {
    name: "Room Number",
    className: "text-right",
  },
];

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

export const UpcomingReservations: FC<{
  selectedReservation: any | null;
  setSelectedReservation: (value: any | null) => void;
  selectedReservationType: "room" | "table";
  setSelectedReservationType: (value: "room" | "table") => void;
}> = ({
  selectedReservation,
  setSelectedReservation,
  selectedReservationType,
  setSelectedReservationType,
}) => {
  const [tableReservationsData, setTableReservationsData] = useState<any[]>([]);
  const [roomReservationsData, setRoomReservationsData] = useState<any[]>([]);
  const { toast } = useToast();

  // load rooms reservations data
  const loadRoomReservationsData = useCallback(async () => {
    // fetch rooms data from the server
    await getRoomReservationsData(1)
      .then((data) => {
        if (data?.reservations) {
          setRoomReservationsData(data.reservations);
        }
        if (data?.error) {
          toast({
            title: data?.error || "Error getting rooms reservations data",
            description: "Failed to fetch rooms reservations data",
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error getting rooms reservations data",
          description: "Failed to fetch rooms reservations data",
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      });
  }, [toast]);

  // load tables reservations data
  const loadTableReservationsData = useCallback(async () => {
    // fetch tables data from the server
    await getTableReservationsData(1)
      .then((data) => {
        if (data?.reservations) {
          setTableReservationsData(data.reservations);
        }
        if (data?.error) {
          toast({
            title: data?.error || "Error getting tables reservations data",
            description: "Failed to fetch tables reservations data",
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error getting tables reservations data",
          description: "Failed to fetch tables reservations data",
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      });
  }, [toast]);

  useEffect(() => {
    loadRoomReservationsData();
    loadTableReservationsData();
  }, [loadRoomReservationsData, loadTableReservationsData]);

  return (
    <Tabs defaultValue="rooms">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger
            value="rooms"
            className="aria-selected:!bg-primary aria-selected:!text-white"
          >
            Rooms
          </TabsTrigger>
          <TabsTrigger
            value="tables"
            className="aria-selected:!bg-primary  aria-selected:!text-white"
          >
            Tables
          </TabsTrigger>
        </TabsList>
      </div>
      {/* rooms table content */}
      <TabsContent value="rooms">
        <Card>
          <CardHeader className="px-5">
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>
              Recent reservations from The Villa Hotel.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Table>
              <TableHeader>
                <TableRow>
                  {roomsTableHeaders.map((header) => (
                    <TableHead key={header.name} className={header.className}>
                      {header.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomReservationsData.map((data, index) => (
                  <TableRow
                    key={index}
                    className={cn(
                      "cursor-pointer",
                      data.reservationNo.toString() ===
                        selectedReservation?.reservationNo.toString()
                        ? "bg-emerald-100"
                        : "",
                    )}
                    onClick={() => {
                      setSelectedReservationType("room");
                      setSelectedReservation(data);
                    }}
                  >
                    <TableCell>
                      <div className="font-medium">
                        {data?.reservationNo.toString().padStart(4, "0")}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="default">{data?.room.type}</Badge>
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
                      {format(data?.checkIn, "LLL dd, y")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(data?.checkOut, "LLL dd, y")}
                    </TableCell>
                    <TableCell className="text-right">
                      {data?.room.number}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* navigate to all room reservations */}
        {roomReservationsData.length > 0 && (
          <div className="mt-4 flex justify-end">
            <Link
              href="/admin/room-reservations"
              className="flex items-center text-primary hover:underline"
            >
              View all <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </TabsContent>

      {/* tables table content */}
      <TabsContent value="tables">
        <Card>
          <CardHeader className="px-5">
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>
              Recent reservations from The Villa Hotel.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
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
                {tableReservationsData.map((data, index) => (
                  <TableRow
                    key={index}
                    className={cn(
                      "cursor-pointer",
                      data.reservationNo.toString() ===
                        selectedReservation?.reservationNo.toString()
                        ? "bg-emerald-100"
                        : "",
                    )}
                    onClick={() => {
                      setSelectedReservationType("table");
                      setSelectedReservation(data);
                    }}
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
          </CardContent>
        </Card>

        {/* navigate to all table reservations */}
        {tableReservationsData.length > 0 && (
          <div className="mt-4 flex justify-end">
            <Link
              href="/admin/table-reservations"
              className="flex items-center text-primary hover:underline"
            >
              View all <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
