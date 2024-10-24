"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  Separator,
} from "@/components";
import { FC } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { format } from "date-fns";

export const UpcomingReservationDetails: FC<{
  selectedReservation: any;
  selectedReservationType: "room" | "table";
}> = ({ selectedReservation, selectedReservationType }) => {
  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Reservation ID:{" "}
              {selectedReservation?.reservationNo.toString().padStart(4, "0") ||
                "****"}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => {
                  navigator.clipboard.writeText(
                    selectedReservation?.reservationNo
                      .toString()
                      .padStart(4, "0"),
                  );
                }}
              >
                <FaCopy className="h-3 w-3" />
                <span className="sr-only">Copy Reservation ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Date:
              {(selectedReservation?.createdAt &&
                format(selectedReservation?.createdAt, "LLL dd, y")) ||
                "N/A"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Reservation Details</div>
            {selectedReservationType === "room" && (
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Room Number</span>
                  <span>{selectedReservation?.room?.number || "N/A"}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Room Type</span>
                  <span>{selectedReservation?.room?.type || "N/A"}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bed Type</span>
                  <span>
                    {selectedReservation?.bed.replaceAll("_", " ") || "N/A"}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span>
                    {(selectedReservation?.checkIn &&
                      format(selectedReservation?.checkIn, "LLL dd, y")) ||
                      "N/A"}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span>
                    {(selectedReservation?.checkOut &&
                      format(selectedReservation?.checkOut, "LLL dd, y")) ||
                      "N/A"}
                  </span>
                </li>
              </ul>
            )}

            {selectedReservationType === "table" && (
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Table Id</span>
                  <span>{selectedReservation?.table?.tableId}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Table Type</span>
                  <span>{selectedReservation?.table?.tableType} Persons</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>
                    {selectedReservation?.date &&
                      format(selectedReservation?.date, "LLL dd, y")}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Time Slot</span>
                  <span>
                    {selectedReservation?.timeSlot?.replaceAll("_", " ")}
                  </span>
                </li>
              </ul>
            )}

            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  {selectedReservation?.total &&
                    `$${selectedReservation?.total?.toFixed(2) || 0}`}
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>{selectedReservation?.name || "N/A"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href="mailto:">{selectedReservation?.email || "N/A"}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href="tel:">{selectedReservation?.phone || "N/A"}</a>
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Payment Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  Payment via
                </dt>
                <dd>{selectedReservation?.type || "Cash on Arrival"}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated{" "}
            <span>
              {(selectedReservation?.updatedAt &&
                format(selectedReservation?.updatedAt, "LLL dd yyyy")) ||
                "N/A"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
