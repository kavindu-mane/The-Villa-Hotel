"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { GridLoader } from "react-magic-spinners";
import {
  Badge,
  Button,
  Headings,
  RoomReservationForm,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { z } from "zod";
import { RoomReservationFormSchema } from "@/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorTypes, pendingReservationResponse } from "@/types";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { createPendingReservation } from "@/actions/room-reservations";
import { useToast } from "@/components/ui/use-toast";
import { Provider } from "react-redux";
import { sessionStore } from "@/states/stores";
import { format } from "date-fns";

// default value for errors
const errorDefault: errorTypes = {
  name: [],
  email: [],
  phone: [],
  beds: [],
  room: [],
  date: [],
  message: "",
};

export const NewReservations: FC = () => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<errorTypes>(errorDefault);
  const [reservation, setReservation] =
    useState<pendingReservationResponse | null>(null);
  const { toast } = useToast();
  // get use search params
  const searchParams = useSearchParams();
  // router hook
  const router = useRouter();

  const form = useForm<z.infer<typeof RoomReservationFormSchema>>({
    resolver: zodResolver(RoomReservationFormSchema),
    defaultValues: {
      beds: "One_Double_Bed",
      room: 1,
      date: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  // submissions
  const onRoomFormSubmit = () => {
    const data = RoomReservationFormSchema.safeParse(form.getValues());
    console.log(data);
  };

  // create pending reservation : this will available for 15 minutes
  const addPendingReservation = useCallback(async () => {
    const { room, date } = form.getValues();
    await createPendingReservation(room, date.from, date.to)
      .then((res) => {
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
          // redirect to room page
          router.push("/rooms", { scroll: false });
        } else {
          if (res.reservation) setReservation(res.reservation);
          setLoading(false);
        }
      })
      .catch(() => {
        toast({
          title: "Something wen wrong",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      });
  }, [form, router, toast]);

  const checkDateValidity = useCallback(async () => {
    if (
      searchParams.has("room_number") &&
      searchParams.has("from") &&
      searchParams.has("to")
    ) {
      form.setValue("room", Number(searchParams.get("room_number")));
      form.setValue("date", {
        from: new Date(searchParams.get("from")!!),
        to: new Date(searchParams.get("to")!!),
      });
      const validatedData = RoomReservationFormSchema.safeParse(
        form.getValues(),
      );
      // redirect to room , if data are not validated
      if (!validatedData.success) {
        console.log(validatedData.error.errors);
        router.push("/rooms");
      } else {
        // add pending reservation
        await addPendingReservation();
      }
    } else {
      // redirect to room
      router.push("/rooms");
    }
  }, [addPendingReservation, form, router, searchParams]);

  useEffect(() => {
    checkDateValidity();
  }, [checkDateValidity]);

  if (loading) {
    return (
      <section className="flex h-screen w-full items-center justify-center">
        <GridLoader color="#10b981" />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-y-8 px-5 py-16">
      {/* heading */}
      <Headings
        title="New Reservations"
        description={"Confirm your reservation by filling out the form below."}
      />
      {/* Form goes here */}
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <div className="flex w-full flex-col items-center justify-start pb-10 lg:w-1/2 lg:items-start lg:border-r lg:px-3">
          <h2 className="mb-6 text-xl font-medium">Reservation Information</h2>
          <Provider store={sessionStore}>
            <RoomReservationForm form={form} errors={errors} />
          </Provider>
        </div>
        <div className="flex w-full flex-col items-center justify-start pb-10 lg:w-1/2 lg:items-end lg:px-3">
          <h2 className="mb-6 text-xl font-medium">Billing Information</h2>
          {/* reservation details */}
          <div className="flex w-full max-w-xl flex-col items-start justify-start gap-2">
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Room Number</p>
              <p className="text-gray-800">{form.getValues("room")}</p>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Room Type</p>
              <Badge color="primary">{reservation?.room.type}</Badge>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Beds</p>
              <p className="text-gray-800">
                {form.watch("beds").replaceAll("_", " ")}
              </p>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Check-in</p>
              <p className="text-gray-800">
                {format(form.getValues("date.from"), "LLL dd, y")}
              </p>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Check-out</p>
              <p className="text-gray-800">
                {" "}
                {format(form.getValues("date.to"), "LLL dd, y")}
              </p>
            </div>
          </div>
          {/* payment details */}
          <div className="mt-5 flex w-full max-w-xl flex-col items-start justify-start gap-2 border-t border-dashed border-slate-500 pt-5">
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Amount</p>
              <p className="text-gray-800">${reservation?.amount}</p>
            </div>
            {/* available offers */}
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Offers</p>
              <Badge color="primary">10% Off</Badge>
            </div>
            {/* coins */}
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-x-1 text-gray-500">
                Coins
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <FaInfoCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="border bg-white shadow-md drop-shadow-md">
                      <div className="max-w-xs text-slate-900">
                        Coins are kind of loyalty points that you can use to get
                        discounts on your next reservation. If you are have a
                        account with us, you can earn coins by making
                        reservations. All reservations will earn 1% of the total
                        amount as coins. 100 coin is equal to one dollar.
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-gray-800">100</p>
            </div>
            <div className="mt-3 flex w-full items-center justify-between gap-2 border-y border-dashed border-gray-500 py-3 text-lg">
              <p className="text-gray-800">Total Amount</p>
              <p className="text-gray-800">$179</p>
            </div>
          </div>

          {/* make reservation button */}
          <Button
            onClick={onRoomFormSubmit}
            className="mt-5 max-w-40 bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500"
          >
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  );
};
