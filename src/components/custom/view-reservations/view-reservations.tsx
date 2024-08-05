"use client";

import {
  cancelRoomReservation,
  getReservationDetails as getRoomReservationDetails,
  requestRoomReservationCancellation,
} from "@/actions/room-reservations";
import {
  cancelTableReservation,
  getReservationDetails as getTableReservationDetails,
  requestTableReservationCancellation,
} from "@/actions/table-reservations";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components";
import { toast } from "@/components/ui/use-toast";
import { ReservationData } from "@/types";
import { CancelReservationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-magic-spinners";
import { z } from "zod";

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
    setLoading(true);
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
      {reservationType === "room" && (
        <RoomReservation reservation={data} loadReservation={loadReservation} />
      )}
      {reservationType === "table" && (
        <TableReservation
          reservation={data}
          loadReservation={loadReservation}
        />
      )}
    </section>
  );
};

const RoomReservation: FC<{
  reservation: ReservationData;
  loadReservation: () => void;
}> = ({ reservation, loadReservation }) => {
  const [isOpen, setIsOpen] = useState(false);
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
            <p className="flex w-full items-center">
              <span className="font-semibold">Status:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="capitalize">
                {reservation.status.toLowerCase()}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Status:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="capitalize">
                {reservation.status.toLowerCase()}
              </span>
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
                    {food.quantity ?? "N/A"} x ${food.food.price ?? "N/A"}
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
              <span className="font-semibold">Room:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.roomTotal?.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Foods:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>
                ${(reservation.total - (reservation.roomTotal || 0)).toFixed(2)}
              </span>
            </p>
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
              <span className="font-semibold">Coins:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.coin.toFixed(2)}</span>
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

      {/* cancel reservation alert*/}
      <CancelReservation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="room"
        reservationNo={reservation.reservationNo}
        loadReservation={loadReservation}
      />

      {/* cancel reservation button */}
      {reservation.status === "Confirmed" && (
        <div className="mt-5 flex justify-center">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Cancel Reservation
          </Button>
        </div>
      )}
    </div>
  );
};

const TableReservation: FC<{
  reservation: ReservationData;
  loadReservation: () => void;
}> = ({ reservation, loadReservation }) => {
  const [isOpen, setIsOpen] = useState(false);
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
              <span className="font-semibold">Date:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">
                {reservation.date?.toDateString() ?? "N/A"}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Time slot:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.timeSlot ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Table Number:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="">{reservation.table?.number ?? "N/A"}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Table Type:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="capitalize">
                {reservation.table?.type.replaceAll("_", " ").toLowerCase() ??
                  "N/A"}
              </span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Status:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span className="capitalize">
                {reservation.status.toLowerCase()}
              </span>
            </p>
            {reservation.foods && (
              <div className="my-3 bg-emerald-500/50 py-3 text-slate-950">
                <p className="w-full text-center">Foods</p>
              </div>
            )}
            {reservation.foods?.map((food, index) => {
              return (
                <p key={index} className="flex w-full items-center">
                  <span className="font-semibold">{food.food.name}</span>
                  <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
                  <span className="">
                    {food.quantity ?? "N/A"} x ${food.food.price ?? "N/A"}
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
              <span className="font-semibold">Table:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.tablesTotal?.toFixed(2)}</span>
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Foods:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>
                $
                {(reservation.total - (reservation.tablesTotal || 0)).toFixed(
                  2,
                )}
              </span>
            </p>
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
              <span className="font-semibold">Coins:</span>
              <span className="mx-3 flex flex-grow border-t-2 border-dashed"></span>
              <span>${reservation.coin.toFixed(2)}</span>
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

      {/* cancel reservation alert*/}
      <CancelReservation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="table"
        reservationNo={reservation.reservationNo}
        loadReservation={loadReservation}
      />

      {/* cancel reservation button */}
      {reservation.status === "Confirmed" && (
        <div className="mt-5 flex justify-center">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Cancel Reservation
          </Button>
        </div>
      )}
    </div>
  );
};

const CancelReservation: FC<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  type: ReservationType;
  reservationNo: number;
  loadReservation: () => void;
}> = ({ isOpen, setIsOpen, type, reservationNo, loadReservation }) => {
  const [loading, setLoading] = useState(false);
  const [isTokenSent, setIsTokenSent] = useState(false);

  const handleSubmit = async (
    data: z.infer<typeof CancelReservationSchema>,
  ) => {
    let cancelReservation = cancelTableReservation;
    if (type === "room") {
      cancelReservation = cancelRoomReservation;
    }
    setLoading(true);
    await cancelReservation(data)
      .then((res) => {
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
        if (res.success) {
          toast({
            title: res?.message,
            description: new Date().toLocaleTimeString(),
            className: "bg-green-500 border-green-600 rounded-md text-white",
          });
          setIsOpen(false);
        }
      })
      .then(() => {
        loadReservation();
      })
      .catch((_) => {
        toast({
          title: "An error occurred while canceling the reservation",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => setLoading(false));
  };

  const requestCancellation = async () => {
    setLoading(true);
    let request = requestRoomReservationCancellation;
    if (type === "table") {
      request = requestTableReservationCancellation;
    }
    await request(reservationNo)
      .then((res) => {
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
        if (res.success) {
          toast({
            title: res?.message,
            description: new Date().toLocaleTimeString(),
            className: "bg-green-500 border-green-600 rounded-md text-white",
          });
          setIsTokenSent(true);
        }
      })
      .catch((_) => {
        toast({
          title: "An error occurred while requesting the cancellation",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setIsTokenSent(true);
        setLoading(false);
      });
  };

  const form = useForm<z.infer<typeof CancelReservationSchema>>({
    resolver: zodResolver(CancelReservationSchema),
    defaultValues: {
      token: "",
      reservationNo: reservationNo,
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cancel the{" "}
            {type} reservation. Also no refund will be given.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isTokenSent && (
          <p className="text-xs text-gray-500">
            A one-time password has been sent to your email address. Please
            enter the OTP to cancel the reservation.
          </p>
        )}
        {!isTokenSent && (
          <Button
            onClick={requestCancellation}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? "Requesting..." : "Request Cancellation"}
          </Button>
        )}

        {/* if token sended */}
        {isTokenSent && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex w-full justify-center">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to cancel the
                      reservation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <Button className="bg-red-500 text-white hover:bg-red-600">
                  {loading ? "Canceling..." : "Cancel Reservation"}
                </Button>
              </div>
            </form>
          </Form>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-500 text-gray-400 hover:text-gray-500">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
