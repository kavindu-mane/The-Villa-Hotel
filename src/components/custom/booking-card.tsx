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
} from "../ui/form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BsBuildingsFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { BookingSchema } from "@/validations";
import { Button } from "..";

export const BookingCard: FC = () => {
  // room types
  const roomTypes = ["standard", "deluxe", "superior"];

  // form hook
  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      room_type: "standard",
      persons: 1,
    },
  });

  // submit handler
  function onSubmit(data: z.infer<typeof BookingSchema>) {
    console.log(data);
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-wrap items-end justify-center gap-3"
        >
          {/* room type */}
          <FormField
            control={form.control}
            name="room_type"
            render={({ field }) => (
              <FormItem className="w-full max-w-[12rem]">
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
              <FormItem className="w-full max-w-[12rem]">
                <FormLabel className="flex items-center gap-2">
                  <IoPerson /> Person
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
