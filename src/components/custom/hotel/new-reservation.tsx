"use client";

import { FC, useState } from "react";
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
import { errorTypes } from "@/types";
import { FaInfoCircle } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<errorTypes>(errorDefault);
  const form = useForm<z.infer<typeof RoomReservationFormSchema>>({
    resolver: zodResolver(RoomReservationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
          <RoomReservationForm form={form} errors={errors} />
        </div>
        <div className="flex w-full flex-col items-center justify-start pb-10 lg:w-1/2 lg:items-end lg:px-3">
          <h2 className="mb-6 text-xl font-medium">Billing Information</h2>
          {/* reservation details */}
          <div className="flex w-full max-w-xl flex-col items-start justify-start gap-2">
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Room Number</p>
              <p className="text-gray-800">1</p>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Room Type</p>
              <Badge color="primary">Deluxe</Badge>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Beds</p>
              <p className="text-gray-800">
                {form.watch("beds").replaceAll("_", " ")}
              </p>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Check-in</p>
              <p className="text-gray-800">2022-10-10</p>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Check-out</p>
              <p className="text-gray-800">2022-10-12</p>
            </div>
          </div>
          {/* payment details */}
          <div className="mt-5 flex w-full max-w-xl flex-col items-start justify-start gap-2 border-t border-dashed border-slate-500 pt-5">
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Amount</p>
              <p className="text-gray-800">$200</p>
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
