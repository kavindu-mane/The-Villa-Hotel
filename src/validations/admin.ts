import { z } from "zod";

//form schema for add and edit room validation
export const RoomFormSchema = z.object({
  number: z.coerce
    .number({ invalid_type_error: "Please select a room" })
    .refine((val) => val !== undefined, {
      message: "Room field has to be filled.",
    })
    .refine((val) => !isNaN(val), {
      message: "Room must be a number",
    }),
  room_type: z.enum(["Deluxe", "Superior", "Standard"], {
    errorMap: (_, ctx) => {
      return {
        message: ctx.defaultError.split(".")[1],
      };
    },
  }),
  persons: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "Persons must be a number",
    })
    .refine((val) => val >= 1 && val <= 10, {
      message: "Persons must be between 1 and 10",
    }),
  beds: z.array(z.string()).refine((val) => val.length > 0, {
    message: "Please select at least one bed",
  }),
  price: z.coerce.number().refine((val) => !isNaN(val), {
    message: "Price must be a number",
  }),
  features: z.array(z.string()).refine((val) => val.length > 0, {
    message: "Please select at least one feature",
  }),
  images: z.array(z.string()).refine((val) => val.length > 0, {
    message: "Please select at least one image",
  }),
});
