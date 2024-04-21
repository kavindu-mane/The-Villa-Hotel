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
});
