"use client";

import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@/components";
import { errorTypes, roomsDataTypes } from "@/types";
import { RoomReservationFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, startTransition, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { ClipLoader, GridLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import {
  oneMonthFromNow,
  today,
  tomorrow,
  transferZodErrors,
  yesterday,
} from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { useSearchParams } from "next/navigation";
import { IoCalendarSharp } from "react-icons/io5";
import { IoIosBed, IoMdPerson } from "react-icons/io";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { addOrUpdateRoomReservation } from "@/actions/admin/room-reservations-crud";
import { setAllRoomReservations } from "@/states/admin";
import { BedTypes } from "@prisma/client";
import { getRoomsDetails } from "@/actions/room-reservations";

// default value for errors
const errorDefault: errorTypes = {
  room: [],
  offer: [],
  beds: [],
  name: [],
  email: [],
  phone: [],
  date: [],
  message: "",
};

export const AdminRoomsReservationDetailsForm: FC<{ isPending: boolean }> = ({
  isPending,
}) => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [availableBedTypes, setAvailableBedTypes] = useState<BedTypes[]>([]);
  const [roomDetails, setRoomDetails] = useState<roomsDataTypes[] | null>(null);
  const { toast } = useToast();
  // dispatcher
  const dispatch = useDispatch();
  const reservation = useSelector(
    (state: AdminState) => state.rooms_reservation_admin,
  );
  const params = useSearchParams();
  const page = params.get("page") || "1";

  // form hook
  const form = useForm<z.infer<typeof RoomReservationFormSchema>>({
    resolver: zodResolver(RoomReservationFormSchema),
    defaultValues: {
      room: 1,
      offer: 0,
      beds: "One_Double_Bed",
      name: "",
      email: "",
      phone: "",
      date: {
        from: today(),
        to: tomorrow(),
      },
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof RoomReservationFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);

    startTransition(async () => {
      await addOrUpdateRoomReservation(
        data,
        reservation.current ? true : false,
        reservation.current ? pageNumber : Infinity,
        reservation.current?.reservationNo,
      )
        .then((res) => {
          if (res.errors) {
            setErrors(transferZodErrors(res.errors).error);
          }
          if (res.error) {
            toast({
              title: res.error,
              description: new Date().toLocaleTimeString(),
              className: "bg-red-500 border-red-600 rounded-md text-white",
            });
          }
          if (res.success) {
            toast({
              title: `Reservation ${!reservation.current ? "added" : "updated"} successfully!`,
              description: new Date().toLocaleTimeString(),
              className: "bg-green-500 border-primary rounded-md text-white",
            });
            dispatch(setAllRoomReservations(res.data));
          }
        })
        .catch((err) => {
          toast({
            title: `Failed to ${!reservation.current ? "add" : "update"} reservation!`,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  // fetch room details function
  const fetchAllRooms = useCallback(async () => {
    setIsFetching(true);
    await getRoomsDetails()
      .then(({ rooms }) => {
        if (rooms) setRoomDetails(rooms as roomsDataTypes[]);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  // update if data have values
  useEffect(() => {
    if (reservation.current) {
      console.log(reservation.current.checkIn);
      form.setValue("room", reservation.current.room.number);
      form.setValue("beds", reservation.current.bed as BedTypes);
      form.setValue("offer", reservation.current.offer);
      form.setValue("name", reservation.current.name || "");
      form.setValue("email", reservation.current.email || "");
      form.setValue("phone", reservation.current.phone || "");
      form.setValue("date", {
        from: new Date(reservation.current.checkIn),
        to: new Date(reservation.current.checkOut),
      });
    } else {
      form.reset();
    }
  }, [form, reservation]);

  // fetch room details
  useEffect(() => {
    fetchAllRooms();
  }, [fetchAllRooms]);

  // set available bed types with respect to room number
  useEffect(() => {
    if (roomDetails) {
      const room = roomDetails.find(
        (room) => room.number === Number(form.getValues("room")),
      );
      if (room) {
        setAvailableBedTypes(room.beds.data as BedTypes[]);
      }
    }
  }, [roomDetails, form]);

  // details array
  const detailsArray = [
    {
      title: "Reservation No",
      value: reservation.current?.reservationNo.toString().padStart(4, "0"),
    },
    {
      title: "Room Type",
      value: reservation.current?.room.type,
    },
    {
      title: "Room Price",
      value: `$ ${reservation.current?.room.price}`,
    },
    {
      title: "Total",
      value: `$ ${reservation.current?.total}`,
    },
    {
      title: "Pending Balance",
      value: `$ ${reservation.current?.pendingBalance}`,
    },
  ];

  if (isPending)
    return (
      <div>
        <Card className="flex flex-col gap-3 p-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-20 w-full" />
        </Card>
      </div>
    );

  return (
    <div>
      <Card className="relative overflow-hidden bg-white">
        {/* fetching spinner */}
        {isFetching && (
          <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <GridLoader color="#10b981" />
          </div>
        )}
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {!reservation.current ? "Add new" : "Edit"} Room Reservation
            </CardTitle>
            <CardDescription>
              {!reservation.current ? "Add new" : "Edit"} reservation details to
              The Villa
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-3 py-8">
          {/* details */}
          {reservation.current && (
            <div className="mb-5 flex flex-col gap-2 border-b px-3 pb-3">
              <h2 className="mb-3 font-medium">Reservation Details</h2>

              <div className="grid grid-cols-1 gap-2">
                {detailsArray.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-row items-center justify-between gap-x-2"
                  >
                    <span className="z-10 bg-white pe-2 text-sm">
                      {item.title}
                    </span>
                    <span className="absolute z-0 w-full border-b border-dashed border-b-slate-500" />
                    <span className="z-10 flex bg-white ps-2 text-sm font-medium">
                      {item.value || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative w-full space-y-5 overflow-hidden"
            >
              <div className="space-y-5 overflow-auto p-2 lg:max-h-[calc(100vh_-_23rem)]">
                {/* room number field */}
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Room Number
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value.toString()}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomDetails?.map((room) => (
                            <SelectItem
                              key={room.number}
                              value={room.number.toString()}
                              className="capitalize"
                            >
                              {room.number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>
                        {errors?.room && errors?.room[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* beds options */}
                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <IoIosBed /> Bed Option
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableBedTypes?.map((bed) => (
                            <SelectItem
                              key={bed}
                              value={bed}
                              className="capitalize"
                            >
                              {bed.replaceAll("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>
                        {errors?.beds && errors?.beds[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* check in and out */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="flex items-center gap-2">
                        <IoCalendarSharp /> Check In and Out
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value.from && field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={{
                              from: field.value.from,
                              to: field.value.to,
                            }}
                            defaultMonth={field.value.from}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <= yesterday() || date > oneMonthFromNow()
                            }
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <IoMdPerson /> Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 bg-white"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.name && errors?.name[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* phone field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <FaPhoneFlip /> Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 bg-white"
                          placeholder="+94xxxxxxxxx"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.phone && errors?.phone[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <MdEmail /> Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 bg-white"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.email && errors?.email[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* offer */}
                <FormField
                  control={form.control}
                  name="offer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Offer (Percentage)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          type="number"
                          min={0}
                          max={100}
                          placeholder="10"
                          {...field}
                          disabled={!!reservation.current?.room}
                          value={reservation.current?.offer || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.offer && errors?.offer[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex w-full justify-center bg-gray-100 py-5">
          {/* submit */}
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="flex h-10 w-full max-w-sm items-center justify-center gap-x-2 lg:max-w-xs"
          >
            {isLoading && <ClipLoader size={20} color="#fff" />}
            {!reservation.current ? "Add" : "Update"} Reservation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
