"use client";

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { oneMonthFromNow } from "@/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BiTime } from "react-icons/bi";
import { IoCalendarSharp } from "react-icons/io5";
import { format } from "date-fns";
import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { errorTypes } from "@/types";
import { ClipLoader } from "react-magic-spinners";
import { cn } from "@/lib/utils";
import { RestaurantAvailabilitySchema } from "@/validations";
import { z } from "zod";

export const AvailabilityForm: FC<{
  availabilityForm: UseFormReturn<z.infer<typeof RestaurantAvailabilitySchema>>;
  isLoading: boolean;
  onAvailabilityFormSubmit: SubmitHandler<
    z.infer<typeof RestaurantAvailabilitySchema>
  >;
  errors: errorTypes;
}> = ({ availabilityForm, isLoading, onAvailabilityFormSubmit, errors }) => {
  //time slots
  const timeSlots = [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 3:00 PM)",
    "Evening (3:00 PM - 6:00 PM)",
    "Night (6:00 PM - 9:00 PM)",
  ];

  return (
    <Form {...availabilityForm}>
      <form
        onSubmit={availabilityForm.handleSubmit(onAvailabilityFormSubmit)}
        className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-5"
      >
        <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:items-start">
          {/* date */}
          <FormField
            control={availabilityForm.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex w-full max-w-sm flex-col lg:max-w-xs">
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
                <FormMessage>{errors?.date && errors?.date[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* time slot */}
          <FormField
            control={availabilityForm.control}
            name="time_slot"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm lg:max-w-xs">
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
                  {errors?.time_slot && errors?.time_slot[0]}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        {/* buttons */}
        <div className="flex w-full justify-end">
          {/* submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
          >
            {isLoading && <ClipLoader size={20} color="#fff" />} Check
            Availability
          </Button>
        </div>
      </form>
    </Form>
  );
};
