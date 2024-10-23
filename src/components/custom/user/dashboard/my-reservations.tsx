"use client";

import { getRoomAndTableReservations } from "@/actions/user/my-reservations";
import {
  AddFeedbacks,
  Badge,
  Button,
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

export const MyReservations: FC = () => {
  const [tableReservationData, setTableReservationData] = useState<
    any[] | null
  >(null);
  const [roomReservationData, setRoomReservationData] = useState<any[] | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    isRoom: true,
  });
  const { toast } = useToast();

  const getData = useCallback(async () => {
    await getRoomAndTableReservations(1, 5)
      .then((data) => {
        if (data.roomReservations) {
          setRoomReservationData(data.roomReservations);
        }
        if (data.tableReservations)
          setTableReservationData(data.tableReservations);
      })
      .catch(() => {
        toast({
          title: "Failed to get reservations",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      });
  }, [toast]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Tabs defaultValue="rooms" className="w-full max-w-screen-2xl">
      <AddFeedbacks
        id={selectedItem.id}
        isRoom={selectedItem.isRoom}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
      />
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
                        <div className="font-medium">{data?.room?.number}</div>
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
                              id: data?.id,
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
                              id: data?.id,
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
      </TabsContent>
    </Tabs>
  );
};
