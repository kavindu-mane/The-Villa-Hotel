"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { UserState } from "@/states/stores";
import { errorTypes } from "@/types";
import { RoomReservationFormSchema } from "@/validations";
import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

/**
 * available bed types : remove with backend data
 */
const availableBedTypes = ["One_Double_Bed", "Two_Single_Beds"];

export const RoomReservationForm: FC<{
  form: UseFormReturn<z.infer<typeof RoomReservationFormSchema>>;
  errors: errorTypes;
}> = ({ form, errors }) => {
  const sessionState = useSelector((state: UserState) => state.session);

  useEffect(() => {
    if (sessionState) {
      form.setValue("name", sessionState.session?.user.name || "");
      form.setValue("email", sessionState.session?.user.email || "");
    }
  }, [form, sessionState]);

  return (
    <Form {...form}>
      <form className="flex w-full max-w-xl flex-col items-center justify-center gap-5">
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
              <FormMessage>{errors?.name && errors?.name[0]}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex w-full flex-col items-start justify-center gap-3 md:flex-row">
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
                <FormMessage>{errors?.phone && errors?.phone[0]}</FormMessage>
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
                <FormMessage>{errors?.email && errors?.email[0]}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        {/* beds options */}
        <FormField
          control={form.control}
          name="beds"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-center gap-2">
                Bed Option
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white capitalize">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableBedTypes?.map((bed) => (
                    <SelectItem key={bed} value={bed} className="capitalize">
                      {bed.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{errors?.beds && errors?.beds[0]}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
