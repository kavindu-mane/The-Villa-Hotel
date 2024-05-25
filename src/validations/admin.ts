import { yesterday } from "@/utils";
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

export const FoodFormSchema = z.object({
  foodType: z.enum(
    [
      "Fride_Rice",
      "Kottu",
      "Soup",
      "Appetizer",
      "Nasi_Goraeng",
      "Pasta",
      "Desert",
      "Cheese_Kottu",
      "Submarine",
      "Hot",
      "Mojito",
      "Milk_Shake",
      "Fresh_Fruit_juice",
      "Soft_Drink",
    ],
    {
      errorMap: (_, ctx) => {
        return {
          message: ctx.defaultError.split(".")[1],
        };
      },
    },
  ),
  foodId: z
    .string()
    .min(1, { message: "Food ID field has to be filled." })
    .max(5, { message: "Food ID should contain maximum 5 characters." }),
  name: z
    .string()
    .min(1, { message: "Name field has to be filled." })
    .max(50, { message: "Name should contain maximum 50 characters." }),

  price: z.coerce.number().refine((val) => !isNaN(val), {
    message: "Price must be a number",
  }),
  description: z
    .string()
    .min(1, { message: "Description field has to be filled." })
    .max(500, { message: "Message should contain maximum 500 characters." }),

  images: z.array(z.string()).refine((val) => val.length > 0, {
    message: "Please select at least one image",
  }),
});

