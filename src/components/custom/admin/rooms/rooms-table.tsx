"use client";

import { getRoomsData } from "@/actions/admin/rooms-crud";
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
import { setAllRooms, setCurrentRoom } from "@/states/admin/rooms-slice";
import { AdminState } from "@/states/stores";
import { roomsDataTypes } from "@/types";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// rooms table column headers
const roomsTableHeaders = [
  {
    name: "Number",
    className: "",
  },
  {
    name: "Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Persons",
    className: "hidden sm:table-cell",
  },
  {
    name: "Price(USD)",
    className: "text-right",
  },
];

export const AdminRoomsTable: FC<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}> = ({ isLoading, setIsLoading }) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  // is error
  const [isError, setIsError] = useState(false);
  // dispatcher
  const dispatch = useDispatch();
  const rooms = useSelector((state: AdminState) => state.rooms_admin);
  const [roomId, setRoomId] = useState<string>("new");
  const [paginationData, setPaginationData] = useState(defaultPaginationData);

  // load rooms data
  const loadRoomsData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    // fetch rooms data from the server
    await getRoomsData(pageInt)
      .then((data) => {
        if (data?.rooms) {
          dispatch(setAllRooms(data?.rooms as roomsDataTypes[]));
          setPaginationData({
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
          });
        }
        if (data?.error) {
          setIsError(true);
          dispatch(setAllRooms(null));
          setPaginationData(defaultPaginationData);
        }
      })
      .catch(() => {
        setIsError(true);
        dispatch(setAllRooms(null));
        setPaginationData(defaultPaginationData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, setIsLoading]);

  // load rooms data on component mount
  useEffect(() => {
    loadRoomsData();
  }, [loadRoomsData]);

  // change set data
  useEffect(() => {
    if (rooms.all && roomId) {
      const room = rooms.all.find((room) => room.number.toString() === roomId);
      if (room) {
        dispatch(setCurrentRoom(room));
      } else {
        dispatch(setCurrentRoom(null));
      }
    }
  }, [dispatch, roomId, rooms]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="">
            <CardTitle className="text-lg">Rooms Data</CardTitle>
            <CardDescription>Rooms details of The Villa Hotel.</CardDescription>
          </div>

          <Button variant="default" onClick={() => setRoomId("new")}>
            Add Room
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
            Failed to load rooms data!
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
                    data.number.toString() === roomId ? "bg-emerald-100" : "",
                  )}
                  onClick={() => setRoomId(data.number.toString())}
                >
                  <TableCell>
                    <div className="font-medium">{data?.number}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">{data?.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data?.persons}
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
        {rooms.all && rooms.all?.length > 0 && !isLoading && (
          <div className="flex w-full justify-end pt-5">
            <Pagination className="flex w-full justify-end pt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={paginationData.currentPage === 1}
                    href={`/admin/rooms?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationData.currentPage === paginationData.totalPages
                    }
                    href={`/admin/rooms?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
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
