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
import { errorTypes } from "@/types";
import { RoomReservationFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { ClipLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import { oneMonthFromNow, transferZodErrors } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { useSearchParams } from "next/navigation";
import { IoCalendarSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BsBuildingsFill } from "react-icons/bs";

// default value for errors
const errorDefault: errorTypes = {
  room: [],
  offer: [],
  beds: [],
  message: "",
};

// beds options
const bedsOptions = ["2 Single Bed", "One Large Double Bed"];

export const AdminRoomsReservationDetailsForm: FC<{ isPending: boolean }> = ({
  isPending,
}) => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  // dispatcher
  const dispatch = useDispatch();
  const rooms = useSelector(
    (state: AdminState) => state.rooms_reservation_admin,
  );
  const params = useSearchParams();
  const page = params.get("page") || "1";

  // form hook
  const form = useForm<z.infer<typeof RoomReservationFormSchema>>({
    resolver: zodResolver(RoomReservationFormSchema),
    defaultValues: {
      beds: "One Large Double Bed",
      date: {
        from: new Date(),
        to: new Date(),
      },
      room: rooms.current?.room || 1,
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof RoomReservationFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);

    // startTransition(async () => {
    //   await addOrUpdateRoom(
    //     data,
    //     rooms.current?.number ? true : false,
    //     rooms.current?.id ? pageNumber : Infinity,
    //   )
    //     .then((res) => {
    //       if (res.errors) {
    //         setErrors(transferZodErrors(res.errors).error);
    //       }
    //       if (res.error) {
    //         toast({
    //           title: res.error,
    //           description: new Date().toLocaleTimeString(),
    //           className: "bg-red-500 border-red-600 rounded-md text-white",
    //         });
    //       }
    //       if (res.success) {
    //         toast({
    //           title: `Room ${data.number ? "added" : "updated"} successfully!`,
    //           description: new Date().toLocaleTimeString(),
    //           className: "bg-green-500 border-primary rounded-md text-white",
    //         });
    //         dispatch(setAllRooms(res.data));
    //       }
    //     })
    //     .catch((err) => {
    //       toast({
    //         title: `Failed to ${data.number ? "add" : "update"} room!`,
    //         description: new Date().toLocaleTimeString(),
    //         className: "bg-red-500 border-red-600 rounded-md text-white",
    //       });
    //     })
    //     .finally(() => {
    //       setFileStates([]);
    //       setIsLoading(false);
    //     });
    // });
  };

  // update if data have values
  useEffect(() => {
    if (rooms.current?.room) {
      form.setValue("room", rooms.current.room);
      form.setValue("beds", rooms.current.beds as any);
      form.setValue("date", rooms.current.date);
    } else {
      form.reset();
    }
  }, [form, rooms]);

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
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {!rooms.current?.room ? "Add new" : "Edit"} Room Reservation
            </CardTitle>
            <CardDescription>
              {!rooms.current?.room ? "Add new" : "Edit"} reservation details to
              The Villa
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="py-8 px-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative w-full space-y-5 overflow-hidden"
            >
              <div className="space-y-5 overflow-auto lg:max-h-[calc(100vh_-_23rem)] p-2">
                {/* room number field */}
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Room Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          type="number"
                          min={1}
                          {...field}
                          disabled={!!rooms.current?.room}
                          value={rooms.current?.room || field.value}
                        />
                      </FormControl>
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
                        <BsBuildingsFill /> Bed Option
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bedsOptions.map((bedType) => (
                            <SelectItem
                              key={bedType}
                              value={bedType}
                              className="capitalize"
                            >
                              {bedType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
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
                              from: field.value.from!,
                              to: field.value.to,
                            }}
                            defaultMonth={field.value.from}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date > oneMonthFromNow()
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
                      <FormLabel>Name</FormLabel>
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
                      <FormLabel>Phone</FormLabel>
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
                      <FormLabel>Email</FormLabel>
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
                        <TbHexagonNumber1Filled /> Offer
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          type="number"
                          min={0}
                          {...field}
                          disabled={!!rooms.current?.room}
                          defaultValue={rooms.current?.offer || field.value}
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
            {!rooms.current?.room ? "Add" : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
