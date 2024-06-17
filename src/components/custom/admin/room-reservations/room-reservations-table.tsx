"use client";

import { getRoomReservationsData } from "@/actions/admin/room-reservations-crud";
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
  setAllRoomReservations,
  setCurrentRoomReservation,
} from "@/states/admin";
import { AdminState } from "@/states/stores";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

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

export const AdminRoomReservationTable: FC<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}> = ({ isLoading, setIsLoading }) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  // is error
  const [isError, setIsError] = useState(false);
  // dispatcher
  const dispatch = useDispatch();
  const rooms = useSelector(
    (state: AdminState) => state.rooms_reservation_admin,
  );
  const [reservationId, setReservationId] = useState<string>("new");
  const [paginationData, setPaginationData] = useState(defaultPaginationData);

  // load rooms reservations data
  const loadReservationsData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    // fetch rooms data from the server
    await getRoomReservationsData(pageInt)
      .then((data) => {
        if (data?.reservations) {
          dispatch(setAllRoomReservations(data?.reservations));
          setPaginationData({
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
          });
        }
        if (data?.error) {
          setIsError(true);
          dispatch(setAllRoomReservations(null));
          setPaginationData(defaultPaginationData);
        }
      })
      .catch(() => {
        setIsError(true);
        dispatch(setAllRoomReservations(null));
        setPaginationData(defaultPaginationData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, setIsLoading]);

  // load rooms reservations data on component mount
  useEffect(() => {
    loadReservationsData();
  }, [loadReservationsData]);

  // change set data
  useEffect(() => {
    if (rooms.all && reservationId) {
      const room = rooms.all.find(
        (room) => room.reservationNo.toString() === reservationId,
      );
      if (room) {
        dispatch(setCurrentRoomReservation(room));
      } else {
        dispatch(setCurrentRoomReservation(null));
      }
    }
  }, [dispatch, reservationId, rooms]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="">
            <CardTitle className="text-lg">Rooms Reservation Data</CardTitle>
            <CardDescription>
              Rooms reservation details of The Villa Hotel.
            </CardDescription>
          </div>

          <Button variant="default" onClick={() => setReservationId("new")}>
            Add Reservations
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-5">
        {/*  if rooms are not available  */}
        {(rooms.all?.length == 0 || rooms.all == null) &&
          !isLoading &&
          !isError && <TableNoDataAvailable />}

        {/* is error occurred */}
        {isError && (
          <div className="flex flex-col items-center justify-center text-center text-red-500">
            <BiSolidError className="h-20 w-20" />
            Failed to load rooms reservation data!
          </div>
        )}

        {/* if rooms data are loading */}
        {isLoading && <TableSkeleton />}

        {/* if rooms data are available */}
        {rooms.all && rooms.all?.length > 0 && !isLoading && (
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
              {rooms.all.map((data, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    data.reservationNo.toString() === reservationId
                      ? "bg-emerald-100"
                      : "",
                  )}
                  onClick={() =>
                    setReservationId(data.reservationNo.toString())
                  }
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
        )}

        {/* pagination */}
        {rooms.all && rooms.all?.length > 0 && !isLoading && (
          <div className="flex w-full justify-end pt-5">
            <Pagination className="flex w-full justify-end pt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={paginationData.currentPage === 1}
                    href={`/admin/room-reservations?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationData.currentPage === paginationData.totalPages
                    }
                    href={`/admin/room-reservations?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
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
