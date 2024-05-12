"use client";

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
import { cn } from "@/lib/utils";
import { FC } from "react";

// rooms table column headers
const roomsTableHeaders = [
  {
    name: "Customer",
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
    className: "text-right",
  },
];

// example data for the rooms table
const roomsTableData = [
  {
    customer: "Liam Johnson",
    customerEmail: "liam_johnson@example.com",
    type: "Online",
    status: "Confirmed",
    checkIn: "2024-06-23",
    CheckOut: "2024-06-25",
  },
  {
    customer: "Olivia Smith",
    customerEmail: "olivia_smith@example.com",
    type: "Offline",
    status: "Ongoing",
    checkIn: "2024-06-24",
    CheckOut: "2024-06-26",
  },
];

export const UpcomingReservations: FC = () => {
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
            <CardTitle>Upcoming Reservations</CardTitle>
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
                {roomsTableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{data.customer}</div>
                      <div className="hidden text-xs text-muted-foreground md:inline">
                        {data.customerEmail}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className={cn(
                          "text-xs",
                          data.type !== "Online" ? "bg-slate-900" : "",
                        )}
                        variant="default"
                      >
                        {data.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {data.checkIn}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {data.CheckOut}
                    </TableCell>
                    <TableCell className="text-right">{data.status}</TableCell>
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