import { oneMonthFromNow, today, yesterday } from "@/utils";
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

// form schema for add and edit food validation
export const FoodFormSchema = z.object({
  foodType: z.enum(
    [
      "Fried_Rice",
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

// form schema for add and edit table validation
export const TableFormSchema = z.object({
  tableType: z.enum(["One_Seat", "Two_Seat", "Four_Seat", "Six_Seat"], {
    errorMap: (_, ctx) => {
      return {
        message: ctx.defaultError.split(".")[1],
      };
    },
  }),
  tableId: z
    .string()
    .min(1, { message: "Table ID field has to be filled." })
    .max(5, { message: "Table ID should contain maximum 5 characters." }),

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

// form schema for promotions validations
export const PromotionsFormSchema = z
  .object({
    code: z
      .string()
      .min(1, {
        message: "Offer code field has to be filled.",
      })
      .max(20, {
        message: "Offer code field should contain maximum 20 characters.",
      }),
    discount: z.coerce
      .number({ invalid_type_error: "Discount field has to be filled." })
      .refine((val) => val !== undefined, {
        message: "Discount field has to be filled.",
      })
      .refine((val) => !isNaN(val), {
        message: "Discount must be a number",
      })
      .refine((val) => val >= 1 && val <= 100, {
        message: "Discount must be between 1 and 100",
      }),
    description: z
      .string()
      .min(1, {
        message: "Offer code field has to be filled.",
      })
      .max(100, {
        message: "Offer code field should contain maximum 100 characters.",
      }),
    validFrom: z
      .date()
      .refine((date) => {
        return !!date;
      }, "Check-in date is required")
      .refine((date) => {
        return date > yesterday();
      }, "Date must be greater than or equal to today"),
    validTo: z
      .date()
      .refine((date) => {
        return !!date;
      }, "Check-in date is required")
      .refine((date) => {
        return date > today();
      }, "Date must be greater than or equal to tomorrow"),
  })
  .refine((data) => {
    return data.validFrom < data.validTo;
  }, "Valid from date must be less than valid to date");

// form schema for add or edit table reservation validation
export const TableReservationFormSchema = z.object({
  tableId: z
    .string()
    .min(1, { message: "Table field has to be filled." })
    .max(5, { message: "Table should contain maximum 5 characters." }),
  name: z
    .string()
    .min(1, { message: "Name field has to be filled." })
    .max(50, { message: "Name should contain maximum 50 characters." }),
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." })
    .max(15, { message: "Phone number should contain maximum 15 characters." }),
  date: z
    .date()
    .refine((date) => {
      return !!date;
    }, "Check-in date is required")
    .refine((date) => {
      return date >= today();
    }, "Date must be greater than or equal to tomorrow")
    .refine((date) => {
      return date <= oneMonthFromNow();
    }, "Date must be less than or equal to 1 months from now"),
  time_slot: z.string().min(1, {
    message: "Please select a time slot",
  }),
  offer: z.optional(
    z.coerce
      .number({ invalid_type_error: "Please enter numbers only" })
      .refine((val) => !isNaN(val), {
        message: "Offer must be a number",
      })
      .refine((val) => val >= 0 && val <= 100, {
        message: "Offer must be between 0 and 100",
      }),
  ),
  offerID: z.optional(z.string()),
  coins: z.optional(
    z.coerce.number({ invalid_type_error: "Please enter numbers only" }),
  ),
});
