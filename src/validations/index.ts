import { z } from "zod";

export const BookingSchema = z.object({
  room_type: z
    .string()
    .min(1, {
      message: "Please select a room type",
    })
    .refine((value) => {
      const roomTypes = ["single", "double", "triple"];
      if (value && !roomTypes.includes(value)) {
        return {
          message: "Please select a valid room type",
        };
      }
    }),
  persons: z
    .string()
    .min(1, { message: "Persons field has to be filled." })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Persons must be a number",
    })
    .refine((val) => val >= 1 && val <= 10, {
      message: "Persons must be between 1 and 10",
    }),
  date: z
    .object(
      {
        from: z.date(),
        to: z.date(),
      },
      { required_error: "Dates are required" },
    )
    .refine((date) => {
      return !!date.from;
    }, "Check-in date is required")
    .refine((date) => {
      return !!date.to;
    }, "Check-out date is required")
    .refine((date) => {
      return date.from < date.to;
    })
    .refine((date) => {
      const today = new Date();
      return date.from >= today && date.to >= today;
    }, "Dates must be greater than or equal to today")
    .refine((date) => {
      const lastDay = new Date();
      // 1 months from now
      lastDay.setMonth(lastDay.getMonth() + 1);
      return date.to <= lastDay;
    }, "Dates must be less than or equal to 1 months from now"),
});
