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

// form schema for add or edit reservation validation
export const RoomReservationFormSchema = z.object({
  room: z.coerce
    .number({ invalid_type_error: "Please select a room" })
    .refine((val) => val !== undefined, {
      message: "Room field has to be filled.",
    })
    .refine((val) => !isNaN(val), {
      message: "Room must be a number",
    }),
  beds: z.enum(["2 Single Bed", "One Large Double Bed"], {
    errorMap: (_, ctx) => {
      return {
        message: ctx.defaultError.split(".")[1],
      };
    },
  }),
  offer: z.optional(
    z.coerce
      .number({ invalid_type_error: "Please enter numbers only" })
      .refine((val) => !isNaN(val), {
        message: "Offer must be a number",
      }),
  ),
  name: z.string().min(1, { message: "Name field has to be filled." }).max(50, {
    message: "Name should contain maximum 50 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be 10 characters" })
    .max(15, {
      message: "Phone number must be 15 characters",
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
      return date.from <= date.to;
    })
    .refine((date) => {
      const today = new Date();
      return date.from > today && date.to > today;
    }, "Dates must be greater than or equal to tomorrow")
    .refine((date) => {
      const lastDay = new Date();
      // 1 months from now
      lastDay.setMonth(lastDay.getMonth() + 1);
      return date.to <= lastDay;
    }, "Dates must be less than or equal to 1 months from now"),
});
