"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { ClipLoader, GridLoader } from "react-magic-spinners";
import {
  Badge,
  Button,
  Headings,
  Label,
  RadioGroup,
  RadioGroupItem,
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
import {
  completePayment,
  createPendingReservation,
  generatePaymentKeys,
} from "@/actions/room-reservations";
import { useToast } from "@/components/ui/use-toast";
import { Provider } from "react-redux";
import { sessionStore } from "@/states/stores";
import { format } from "date-fns";
import { BiCheck } from "react-icons/bi";
import { transferZodErrors } from "@/utils";

declare global {
  interface Window {
    payhere: any;
  }
}

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
  const [pending, setPending] = useState(false);
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
      name: "",
      email: "",
      phone: "",
      room: 1,
      date: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  // pop up payment gateway
  const popUpPaymentGateway = async (res: any) => {
    const payment_object = {
      sandbox: true,
      preapprove: true,
      merchant_id: res?.merchant_id,
      return_url: res?.return_url,
      cancel_url: res?.cancel_url,
      notify_url: res?.notify_url,
      order_id: res?.order_id,
      items: res?.items,
      amount: res?.amount,
      currency: res?.currency,
      hash: res?.hash,
      first_name: res?.first_name,
      last_name: res?.last_name,
      email: res?.email,
      phone: res?.phone,
      address: res?.address,
      city: res?.city,
      country: res?.country,
    };

    window.payhere.startPayment(payment_object);

    window.payhere.onCompleted = async function onCompleted() {
      setPending(true);
      await completePayment(Number(res.order_id), Number(res.amount))
        .then((res) => {
          if (res.success) {
            toast({
              title: "Payment completed",
              description: new Date().toLocaleTimeString(),
              className: "bg-green-500 border-green-600 rounded-md text-white",
            });

            // redirect to room page
            router.push("/rooms", { scroll: false });
          }

          if (res.error) {
            toast({
              title: "Payment error.If you have any issue, please contact us.",
              description: new Date().toLocaleTimeString(),
              className: "bg-red-500 border-red-600 rounded-md text-white",
            });
          }
        })
        .finally(() => {
          setPending(false);
        });
    };

    window.payhere.onDismissed = function onDismissed() {
      toast({
        title: "Payment dismissed",
        description: new Date().toLocaleTimeString(),
        className: "bg-red-500 border-red-600 rounded-md text-white",
      });
    };

    window.payhere.onError = function onError() {
      toast({
        title: "Payment error",
        description: new Date().toLocaleTimeString(),
        className: "bg-red-500 border-red-600 rounded-md text-white",
      });
    };
  };

  // submissions
  const onRoomFormSubmit = async (
    data: z.infer<typeof RoomReservationFormSchema>,
  ) => {
    setPending(true);
    await generatePaymentKeys(data)
      .then(async (res) => {
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }

        if (res.errors) {
          setErrors(transferZodErrors(res.errors).error);
        }

        if (res.payment) {
          console.log(res.payment);
          // pop up payment gateway
          await popUpPaymentGateway(res.payment);
        }
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setPending(false);
      });
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
        validatedData.error.errors.forEach((error) => {
          if (error.path[0] === "date" || error.path[0] === "room") {
            router.push("/rooms");
            return;
          }
        });
      }
      // add pending reservation
      await addPendingReservation();
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

            {/* available offers */}
            <div className="flex w-full flex-col gap-2">
              <p className="text-gray-500">Offers</p>

              <RadioGroup
                onValueChange={(value) => {
                  form.setValue("offerID", value);
                  form.setValue(
                    "offer",
                    reservation?.offers.find((offer) => offer.code === value)
                      ?.discount,
                  );
                }}
                value={form.watch("offerID")}
                className="flex w-full flex-wrap gap-2"
              >
                {reservation?.offers.map((offer, index) => (
                  <Label key={index} className="w-full">
                    <RadioGroupItem
                      accessKey="offerID"
                      value={offer.code}
                      className="peer sr-only"
                    />
                    <div
                      className={`relative flex w-full cursor-pointer flex-col gap-y-1 rounded-lg ${form.watch("offerID") === offer.code ? "bg-primary" : "bg-cyan-600"} p-5 text-start font-normal text-white shadow-md`}
                    >
                      <p className="">Offer Code : {offer.code}</p>
                      <p className="">
                        Valid Till : {format(offer.validTo, "LLL dd, y")}
                      </p>
                      <div className="absolute right-2 flex items-center gap-x-2">
                        <p className="text-2xl font-medium">
                          {offer.discount}% Off
                        </p>
                        <BiCheck
                          className={`h-6 w-6 ${form.watch("offerID") === offer.code ? "flex" : "hidden"} rounded-full bg-white font-bold text-primary`}
                        />
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* total */}
            <div className="mt-3 flex w-full items-center justify-between gap-2 border-y border-dashed border-gray-500 py-3 text-lg">
              <p className="text-gray-800">Total Amount</p>
              <p className="text-gray-800">
                $
                {reservation?.amount!! -
                  (reservation?.amount!! * form.watch("offer")! || 0) / 100}
              </p>
            </div>
          </div>

          {/* make reservation button */}
          <Button
            onClick={form.handleSubmit(onRoomFormSubmit)}
            className="mt-5 flex w-full max-w-48 items-center justify-center gap-x-3 bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500"
          >
            {pending && <ClipLoader size={20} color="#fff" />}
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  );
};
