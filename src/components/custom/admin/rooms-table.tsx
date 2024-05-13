"use client";

import { getRoomsData } from "@/actions/admin/rooms-crud";
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
  TableNoDataAvailable,
  TableRow,
  TableSkeleton,
} from "@/components";
import { roomsDataTypes } from "@/types";
import { FC, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";

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
    name: "Price",
    className: "text-right",
  },
];

export const AdminRoomsTable: FC = () => {
  // use state for save the rooms table data
  const [roomsTableData, setRoomsTableData] = useState<roomsDataTypes | null>(
    null,
  );
  // state for is loading
  const [isLoading, setIsLoading] = useState(true);
  // is error
  const [isError, setIsError] = useState(false);

  // load rooms data
  const loadRoomsData = async () => {
    setIsLoading(true);
    setIsError(false);
    // fetch rooms data from the server
    await getRoomsData(1)
      .then((data) => {
        console.log(data);
        if (data?.rooms) {
          setRoomsTableData(data?.rooms);
        }
        if (data?.error) {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
        setRoomsTableData(null);
      })
      .finally(() => setIsLoading(false));
  };

  // load rooms data on component mount
  useEffect(() => {
    loadRoomsData();
  }, []);

  return (
    <Card>
      <CardHeader className="px-5">
        <CardTitle>Rooms Data</CardTitle>
        <CardDescription>Rooms details of The Villa Hotel.</CardDescription>
      </CardHeader>
      <CardContent className="px-5">
        {/*  if rooms are not available  */}
        {(roomsTableData?.length == 0 || roomsTableData == null) &&
          !isLoading && <TableNoDataAvailable />}

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
        {roomsTableData && !isLoading && (
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
              {roomsTableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{data?.number}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">{data?.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data?.persons}
                  </TableCell>
                  <TableCell className="text-right">{data?.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
