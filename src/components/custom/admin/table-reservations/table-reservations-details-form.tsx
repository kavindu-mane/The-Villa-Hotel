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
import { errorTypes, tablesDataTypes } from "@/types";
import { TableReservationFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, startTransition, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { ClipLoader, GridLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import { oneMonthFromNow, today, transferZodErrors, yesterday } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { IoCalendarSharp } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { addOrUpdateTableReservation } from "@/actions/admin/table-reservations-crud";
import { setAllTableReservations } from "@/states/admin";
import { getTablesDetails } from "@/actions/table-reservations";
import { BiTime } from "react-icons/bi";

// default value for errors
const errorDefault: errorTypes = {
  tableId: [],
  date: [],
  timeSlot: [],
  tableType: [],
  name: [],
  phone: [],
  email: [],
  offer: [],
  message: "",
};

export const AdminTablesReservationDetailsForm: FC<{ isPending: boolean }> = ({
  isPending,
}) => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [tableDetails, setTableDetails] = useState<tablesDataTypes[] | null>(
    null,
  );
  const { toast } = useToast();
  // dispatcher
  const dispatch = useDispatch();
  const reservation = useSelector(
    (state: AdminState) => state.tables_reservation_admin,
  );

  // form hook
  const form = useForm<z.infer<typeof TableReservationFormSchema>>({
    resolver: zodResolver(TableReservationFormSchema),
    defaultValues: {
      tableId: "A1",
      offer: 0,
      name: "",
      email: "",
      phone: "",
      date: today(),
      timeSlot: "Morning (9:00 AM - 12:00 PM)",
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof TableReservationFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);

    startTransition(async () => {
      await addOrUpdateTableReservation(
        data,
        reservation.current ? true : false,
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
            dispatch(setAllTableReservations(res.data));
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

  // fetch table details function
  const fetchAllTables = useCallback(async () => {
    setIsFetching(true);
    await getTablesDetails()
      .then(({ tables }) => {
        if (tables) setTableDetails(tables as tablesDataTypes[]);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  // update if data have values
  useEffect(() => {
    if (reservation.current) {
      form.setValue("tableId", reservation.current.table.tableId);
      form.setValue("date", reservation.current.date);
      form.setValue("timeSlot", reservation.current.timeSlot);
      form.setValue("name", reservation.current.name);
      form.setValue("phone", reservation.current.phone);
      form.setValue("email", reservation.current.email);
      form.setValue("offer", reservation.current.offerDiscount);
    } else {
      form.reset();
    }
  }, [form, reservation]);

  // fetch table details
  useEffect(() => {
    fetchAllTables();
  }, [fetchAllTables]);

  // details array
  const detailsArray = [
    {
      title: "Reservation No",
      value: reservation.current?.reservationNo.toString().padStart(4, "0"),
    },
    {
      title: "Reservation Status",
      value: reservation.current?.status,
    },
    {
      title: "Table Type",
      value: reservation.current?.table.tableType.replaceAll("_", " "),
    },
    {
      title: "Total",
      value: `$ ${reservation.current?.total}`,
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

  //time slots
  const timeSlots = [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 3:00 PM)",
    "Evening (3:00 PM - 6:00 PM)",
    "Night (6:00 PM - 9:00 PM)",
  ];

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
              {!reservation.current ? "Add new" : "Edit"} Table Reservation
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
                {/* table number field */}
                <FormField
                  control={form.control}
                  name="tableId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Table Number
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
                          {tableDetails?.map((table) => (
                            <SelectItem
                              key={table.tableId}
                              value={table.tableId.toString()}
                              className="capitalize"
                            >
                              {table.tableId}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>
                        {errors?.tableId && errors?.tableId[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="flex items-center gap-2">
                        <IoCalendarSharp /> Date
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
                              {field.value ? (
                                format(field.value, "LLL dd, y")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            defaultMonth={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date > oneMonthFromNow()
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage>
                        {errors?.date && errors?.date[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* time slot */}
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <BiTime /> Time Slot
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white capitalize">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((timeSlot) => (
                            <SelectItem
                              key={timeSlot}
                              value={timeSlot}
                              className="capitalize"
                            >
                              {timeSlot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>
                        {errors?.timeSlot && errors?.timeSlot[0]}
                      </FormMessage>
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
                          disabled={!!reservation.current?.table}
                          value={
                            reservation.current?.offerDiscount || field.value
                          }
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
