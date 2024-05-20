"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  Button,
} from "@/components";
import { format } from "date-fns";
import { z } from "zod";
import { BsBuildingsFill } from "react-icons/bs";
import { IoPerson, IoCalendarSharp } from "react-icons/io5";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BookingSchema } from "@/validations";
import { cn } from "@/lib/utils";
import { oneMonthFromNow, tomorrow } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { RoomType } from "@prisma/client";

export const BookingCard: FC = () => {
  // room types
  const roomTypes = ["Standard", "Deluxe", "Superior"];
  // router hook
  const router = useRouter();
  // get use search params
  const searchParams = useSearchParams();

  // form hook
  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      room_type: searchParams.get("room_type") as RoomType || "Standard",
      persons: Number(searchParams.get("persons")) || 1,
      date: {
        from: new Date(searchParams.get("from") || tomorrow()),
        to: new Date(searchParams.get("to") || tomorrow()),
      },
    },
  });

  // submit handler
  function onSubmit(data: z.infer<typeof BookingSchema>) {
    router.push(
      `/rooms?room_type=${data.room_type}&persons=${data.persons}&from=${format(data.date.from, "yyyy-MM-dd")}&to=${format(data.date.to, "yyyy-MM-dd")}`,
    );
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-end justify-center gap-3 rounded-lg bg-white px-2 py-8 lg:gap-8 lg:rounded-none"
        >
          {/* room type */}
          <FormField
            control={form.control}
            name="room_type"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm lg:max-w-xs">
                <FormLabel className="flex items-center gap-2">
                  <BsBuildingsFill /> Room Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roomTypes.map((roomType) => (
                      <SelectItem
                        key={roomType}
                        value={roomType}
                        className="capitalize"
                      >
                        {roomType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* persons */}
          <FormField
            control={form.control}
            name="persons"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm lg:max-w-xs">
                <FormLabel className="flex items-center gap-2">
                  <IoPerson /> Persons
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
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
              <FormItem className="flex w-full max-w-sm flex-col lg:max-w-xs">
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
                      selected={{ from: field.value.from!, to: field.value.to }}
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
          <Button type="submit" className="h-10 w-full max-w-sm lg:max-w-xs">
            Check Availability
          </Button>
        </form>
      </Form>
    </div>
  );
};
