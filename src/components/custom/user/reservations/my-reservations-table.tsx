"use client";

import {
  getRoomReservations,
  getTableReservations,
} from "@/actions/user/my-reservations";
import {
  AddFeedbacks,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { defaultPaginationData } from "@/constants";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

// rooms table column headers
const roomsTableHeaders = [
  {
    name: "Room Number",
    className: "",
  },
  {
    name: "Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Check In",
    className: "hidden sm:table-cell",
  },
  {
    name: "Check Out",
    className: "hidden md:table-cell",
  },
  {
    name: "Status",
    className: "hidden md:table-cell",
  },
  {
    name: "Action",
    className: "text-right",
  },
];

// tables table column headers
const tablesTableHeaders = [
  {
    name: "Table Number",
    className: "",
  },
  {
    name: "Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Date",
    className: "hidden sm:table-cell",
  },
  {
    name: "Time Slot",
    className: "hidden md:table-cell",
  },
  {
    name: "Status",
    className: "hidden md:table-cell",
  },
  {
    name: "Action",
    className: "text-right",
  },
];

export const MyReservationsTable: FC = () => {
  const [tableReservationData, setTableReservationData] = useState<
    any[] | null
  >(null);
  const [roomReservationData, setRoomReservationData] = useState<any[] | null>(
    null,
  );
  const [paginationDataRooms, setPaginationDataRooms] = useState(
    defaultPaginationData,
  );
  const [paginationDataTables, setPaginationDataTables] = useState(
    defaultPaginationData,
  );
  const { toast } = useToast();
  const params = useSearchParams();
  const roomPage = params.get("room_page") || "1";
  const tablePage = params.get("table_page") || "1";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    isRoom: true,
  });

  const getRoomData = useCallback(async () => {
    const pageInt = isNaN(Number(roomPage)) ? 1 : Number(roomPage);
    await getRoomReservations(pageInt)
      .then((data) => {
        if (data.roomReservations) {
          setRoomReservationData(data.roomReservations);
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
  }, [roomPage, toast]);

  const getTableData = useCallback(async () => {
    const pageInt = isNaN(Number(tablePage)) ? 1 : Number(tablePage);
    await getTableReservations(pageInt)
      .then((data) => {
        if (data.tableReservations) {
          setTableReservationData(data.tableReservations);
        }
        setPaginationDataTables({
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
  }, [tablePage, toast]);

  useEffect(() => {
    getRoomData();
    getTableData();
  }, [getRoomData, getTableData]);

  return (
    <div className="w-full">
      <AddFeedbacks
        id={selectedItem.id}
        isRoom={selectedItem.isRoom}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={selectedItem.isRoom ? getRoomData : getTableData}
      />
      <h1 className="mb-5 text-lg font-medium">My Reservations</h1>
      <Tabs defaultValue="rooms" className="w-full max-w-screen-2xl">
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
              <CardTitle>My Reservations</CardTitle>
              <CardDescription>
                My Recent reservations from The Villa Hotel.
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
                  {roomReservationData &&
                    roomReservationData?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">
                            {data?.room?.number}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            className={cn(
                              "text-xs",
                              data?.type !== "Online" ? "bg-slate-900" : "",
                            )}
                            variant="default"
                          >
                            {data?.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {new Date(data?.checkIn).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(data?.checkOut).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data?.status}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size={"sm"}
                            disabled={data?.feedbacks?.length > 0}
                            onClick={() => {
                              setSelectedItem({
                                id: data.id,
                                isRoom: true,
                              });
                              setIsOpen(true);
                            }}
                          >
                            Rate Us
                          </Button>
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
                    href={`/user/reservations?&room_page=${isNaN(Number(roomPage)) ? 1 : Number(roomPage) - 1}&table_page=${tablePage}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationDataRooms.currentPage ===
                      paginationDataRooms.totalPages
                    }
                    href={`/user/reservations?&room_page=${isNaN(Number(roomPage)) ? 1 : Number(roomPage) + 1}&table_page=${tablePage}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>

        {/* tables table content */}
        <TabsContent value="tables">
          <Card>
            <CardHeader className="px-5">
              <CardTitle>My Reservations</CardTitle>
              <CardDescription>
                My Recent reservations from The Villa Hotel.
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
                  {tableReservationData &&
                    tableReservationData?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">
                            {data?.table?.tableId} (
                            {data?.table.tableType.replaceAll("_", " ")})
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            className={cn(
                              "text-xs",
                              data?.type !== "Online" ? "bg-slate-900" : "",
                            )}
                            variant="default"
                          >
                            {data?.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {new Date(data?.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data?.timeSlot}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data?.status}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size={"sm"}
                            disabled={data?.feedbacks?.length > 0}
                            onClick={() => {
                              setSelectedItem({
                                id: data.id,
                                isRoom: false,
                              });
                              setIsOpen(true);
                            }}
                          >
                            Rate Us
                          </Button>
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
                    isActive={paginationDataTables.currentPage === 1}
                    href={`/user/reservations?&table_page=${isNaN(Number(tablePage)) ? 1 : Number(tablePage) - 1}&room_page=${roomPage}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationDataTables.currentPage ===
                      paginationDataTables.totalPages
                    }
                    href={`/user/reservations?&table_page=${isNaN(Number(tablePage)) ? 1 : Number(tablePage) + 1}&room_page=${roomPage}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
