"use client";
import {
  Button,
  Form,
  FormControl,
  RadioGroup,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroupItem,
  Textarea,
} from "@/components";
import { errorTypes } from "@/types";
import { RestaurantReservationSchema } from "@/validations";
import { ClipLoader } from "react-magic-spinners";
import { Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const RestaurantReservationForm: FC<{
  reservationForm: UseFormReturn<z.infer<typeof RestaurantReservationSchema>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  onReservationFormSubmit: SubmitHandler<
    z.infer<typeof RestaurantReservationSchema>
  >;
  isLoading: boolean;
  errors: errorTypes;
}> = ({
  reservationForm,
  setCurrentStep,
  onReservationFormSubmit,
  isLoading,
  errors,
}) => {
    return (
      <Form {...reservationForm}>
        <form
          onSubmit={reservationForm.handleSubmit(onReservationFormSubmit)}
          className="flex w-full max-w-2xl flex-col items-center justify-center gap-5 pt-8"
        >
          {/* available table numbers */}
          <FormField
            control={reservationForm.control}
            name="table"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Table</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-wrap justify-center gap-3"
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <FormItem key={i} className="flex items-center">
                        <FormLabel className="w-28 cursor-pointer rounded-lg bg-slate-600 py-3 text-center font-normal text-white disabled:bg-gray-300 has-[:checked]:bg-primary">
                          <FormControl>
                            <RadioGroupItem
                              value={(i + 1).toString()}
                              className="peer sr-only"
                            />
                          </FormControl>
                          Table {(i + 1).toString().padStart(2, "0")}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* name field */}
          <FormField
            control={reservationForm.control}
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
              control={reservationForm.control}
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
              control={reservationForm.control}
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



          <div className="flex w-full justify-between">
            {/* back button */}
            <Button
              onClick={() => setCurrentStep(1)}
              className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2 border border-primary bg-transparent text-primary hover:text-white"
            >
              Previous
            </Button>
            {/* submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
            >
              {isLoading && <ClipLoader size={20} color="#fff" />} Reserve Table
            </Button>
          </div>
        </form>
      </Form>
    );
  };
