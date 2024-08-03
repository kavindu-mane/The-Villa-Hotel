"use client";

import { getReservationDetails as getRoomReservationDetails } from "@/actions/room-reservations";
import { getReservationDetails as getTableReservationDetails } from "@/actions/table-reservations";
import { toast } from "@/components/ui/use-toast";
import { ReservationData } from "@/types";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { GridLoader } from "react-magic-spinners";

type ReservationType = "table" | "room";

export const ViewReservations: FC = () => {
  const [reservationType, setReservationType] =
    useState<ReservationType>("table");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState<ReservationData | null>(null);
  const searchParams = useSearchParams();

  // load reservation data
  const loadReservation = useCallback(async () => {
    // get reservation number from query params
    const table = searchParams.get("table");
    const room = searchParams.get("room");
    setNotFound(!table && !room);
    setLoading(true);

    let reservation = null;

    if (table) {
      setReservationType("table");
      reservation = await getTableReservationDetails(parseInt(table));
    } else if (room) {
      setReservationType("room");
      reservation = await getRoomReservationDetails(parseInt(room));
    }
    // if any error
    if (reservation?.error) {
      toast({
        title: reservation.error,
        description: new Date().toLocaleTimeString(),
        className: "bg-red-500 border-red-600 rounded-md text-white",
      });
      if (reservation.status === 404) {
        setNotFound(true);
      }
    }
    // if data is available
    if (reservation?.reservation) {
      setData(reservation.reservation);
    }
  }, [searchParams]);

  useEffect(() => {
    loadReservation().finally(() => setLoading(false));
  }, [loadReservation]);

  if (notFound) {
    return (
      <section className="flex h-[50vh] items-center justify-center">
        <p className="text-2xl font-medium md:text-3xl xl:text-4xl">
          Reservation not found
        </p>
      </section>
    );
  }

  if (loading || data === null) {
    return (
      <section className="flex h-[50vh] items-center justify-center">
        <GridLoader color="#10b981" />
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-y-4 pb-2 pt-10 text-gray-700">
      {reservationType === "room" && <RoomReservation reservation={data} />}
      {reservationType === "table" && <TableReservation reservation={data} />}
    </section>
  );
};

const RoomReservation: FC<{ reservation: ReservationData }> = ({
  reservation,
}) => {
  return (
    <div className="flex w-full flex-col gap-y-4 px-2">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          Room Reservation
        </h2>
        <div className="flex w-full flex-col gap-x-5 gap-y-3 lg:flex-row">
          <div className="flex w-full flex-col gap-y-2 pt-5">
            <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
              <p className="w-full text-center">General Information</p>
            </div>
            <p className="flex w-full items-center">
              <span className="font-semibold">Reservation No:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.reservationNo}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Client:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.name ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Email:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.email ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Check In:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">
                {reservation.checkIn?.toDateString() ?? "N/A"}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Check Out:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">
                {reservation.checkOut?.toDateString() ?? "N/A"}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Room Number:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.room?.number ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Room Type:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.room?.type ?? "N/A"}</span>
            </p>
            {reservation.foods && (
              <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
                <p className="w-full text-center">Additional Foods</p>
              </div>
            )}
            {reservation.foods?.map((food, index) => {
              return (
                <p key={index} className="flex w-full items-center">
                  <span className="font-semibold">{food.food.name}</span>
                  <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
                  <span className="">
                    {food.quantity ?? "N/A"} x {food.food.price ?? "N/A"}
                  </span>
                </p>
              );
            })}
          </div>
          <div className="flex w-full flex-col gap-y-2 pt-5">
            <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
              <p className="w-full text-center">Billing Information</p>
            </div>
            <p className="flex w-full items-center">
              <span className="font-semibold">Total:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.total.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Offer Percentage:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>{reservation.offerPercentage.toFixed(2)}%</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Offer:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.offer.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Payed:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.payed?.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Pending Balance:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.pending?.toFixed(2)}</span>
            </p>
            <div className="my-3 border-y-2 border-dashed border-slate-900 py-3 text-slate-900">
              <p className="flex w-full items-center">
                <span className="font-semibold">Sub Total:</span>
                <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
                <span>${reservation.subTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableReservation: FC<{ reservation: ReservationData }> = ({
  reservation,
}) => {
  return (
    <div className="flex w-full flex-col gap-y-4 px-2">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          Table Reservation
        </h2>
        <div className="flex w-full flex-col gap-x-5 gap-y-3 lg:flex-row">
          <div className="flex w-full flex-col gap-y-2 pt-5">
            <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
              <p className="w-full text-center">General Information</p>
            </div>
            <p className="flex w-full items-center">
              <span className="font-semibold">Reservation No:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.reservationNo}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Client:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.name ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Email:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.email ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Check In:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">
                {reservation.checkIn?.toDateString() ?? "N/A"}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Check Out:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">
                {reservation.checkOut?.toDateString() ?? "N/A"}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Table Number:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.table?.number ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Table Type:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.table?.type ?? "N/A"}</span>
            </p>
            {reservation.foods && (
              <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
                <p className="w-full text-center">Additional Foods</p>
              </div>
            )}
            {reservation.foods?.map((food, index) => {
              return (
                <p key={index} className="flex w-full items-center">
                  <span className="font-semibold">{food.food.name}</span>
                  <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
                  <span className="">
                    {food.quantity ?? "N/A"} x {food.food.price ?? "N/A"}
                  </span>
                </p>
              );
            })}
          </div>
          <div className="flex w-full flex-col gap-y-2 pt-5">
            <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
              <p className="w-full text-center">Billing Information</p>
            </div>
            <p className="flex w-full items-center">
              <span className="font-semibold">Total:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.total.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Offer Percentage:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>{reservation.offerPercentage.toFixed(2)}%</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Offer:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.offer.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Payed:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.payed?.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Pending Balance:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.pending?.toFixed(2)}</span>
            </p>
            <div className="my-3 border-y-2 border-dashed border-slate-900 py-3 text-slate-900">
              <p className="flex w-full items-center">
                <span className="font-semibold">Sub Total:</span>
                <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
                <span>${reservation.subTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
