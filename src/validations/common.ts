import { oneMonthFromNow, today, yesterday } from "@/utils";
import { z } from "zod";


//form schema for table booking validation
export const TableReservationsSchema = z.object({
  table_type: z.enum(["One_Seat", "Two_Seat", "Four_Seat", "Six_Seat"], {
    errorMap: (_, ctx) => {
      return {
        message: ctx.defaultError.split(".")[1],
      };
    },
  }),
  date: z
    .date()
    .refine((date) => {
      return !!date;
    }, "Date is required")
    .refine((date) => {
      return date >= today();
    }, "Date must be greater than or equal to tomorrow")
    .refine((date) => {
      return date <= oneMonthFromNow();
    }, "Date must be less than or equal to 1 months from now"),
  time_slot: z.string().min(1, {
    message: "Please select a time slot",
  }),
});

// form schema for room booking validation
export const ReservationsSchema = z.object({
  room_type: z.enum(["Deluxe", "Superior", "Standard"], {
    errorMap: (_, ctx) => {
      return {
        message: ctx.defaultError.split(".")[1],
      };
    },
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
    }, "Check-out date must be greater than check-in date")
    .refine((date) => {
      return date.from > yesterday() && date.to > new Date();
    }, "Dates must be greater than or equal to tomorrow")
    .refine((date) => {
      const lastDay = new Date();
      // 1 months from now
      lastDay.setMonth(lastDay.getMonth() + 1);
      return date.to <= lastDay;
    }, "Dates must be less than or equal to 1 months from now"),
});

// form schema for login validation
export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password field need at least 8 characters." })
    .max(32, { message: "Password should contain maximum 32 characters." }),
});

// form schema for register validation
export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name field has to be filled." })
      .max(50, { message: "Name should contain maximum 50 characters." }),
    email: z
      .string()
      .min(1, { message: "Email field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password field need at least 8 characters." })
      .max(32, { message: "Password should contain maximum 32 characters." }),
    repeat_password: z
      .string()
      .min(8, { message: "Repeat Password field need at least 8 characters." })
      .max(32, {
        message: "Repeat Password should contain maximum 32 characters.",
      }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords do not match.",
    path: ["repeat_password"],
  });

// form schema for reset password validation
export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
});

// form schema for new password validation
export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password field has to be filled." })
      .max(32, { message: "Password should contain maximum 32 characters." }),
    repeat_password: z
      .string()
      .min(1, { message: "Repeat Password field has to be filled." })
      .max(32, {
        message: "Repeat Password should contain maximum 32 characters.",
      }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords do not match.",
    path: ["repeat_password"],
  });

// form schema for contact us validation
export const ContactUsSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name field has to be filled." })
    .max(50, { message: "Name should contain maximum 50 characters." }),
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
  message: z
    .string()
    .min(1, { message: "Message field has to be filled." })
    .max(500, { message: "Message should contain maximum 500 characters." }),
});

// form schema for restaurant table availability validation
export const RestaurantAvailabilitySchema = z.object({
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
  // .refine((value) => {
  //   const timeSlots = [
  //     "Morning (9:00 AM - 12:00 PM)",
  //     "Afternoon (12:00 PM - 3:00 PM)",
  //     "Evening (3:00 PM - 6:00 PM)",
  //     "Night (6:00 PM - 9:00 PM)",
  //   ];
  //   if (value && !timeSlots.includes(value)) {
  //     return {
  //       message: "Please select a valid time slot",
  //     };
  //   }
  // }),
});

// form schema for restaurant reservation validation
export const RestaurantReservationSchema = z.object({
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
  table: z.coerce
    .number({ invalid_type_error: "Please select a table" })
    .refine((val) => val !== undefined, {
      message: "Table field has to be filled.",
    })
    .refine((val) => !isNaN(val), {
      message: "Table must be a number",
    })
    .refine((val) => val >= 1 && val <= 20, {
      message: "Table number must be between 1 and 20",
    }),
});

// form schema for restaurant menu selection validation
export const RestaurantMenuSchema = z.object({
  menu: z.array(
    z.object({
      id: z.string(),
      quantity: z
        .number()
        .int()
        .min(1, { message: "Quantity must be at least 1" }),
    }),
  ),
});

//remark validation
export const RestaurantRemarkSchema = z.object({
  remark: z
    .string()
    .max(500, { message: "Message should contain maximum 500 characters." })
    .optional()
    .or(z.literal("")),
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
  beds: z.enum(["Two_Single_Beds", "One_Double_Bed"], {
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
      })
      .refine((val) => val >= 0 && val <= 100, {
        message: "Offer must be between 0 and 100",
      }),
  ),
  offerID: z.optional(z.string()),
  coins: z.optional(
    z.coerce.number({ invalid_type_error: "Please enter numbers only" }),
  ),
  name: z.optional(
    z.string().min(1, { message: "Name field has to be filled." }).max(50, {
      message: "Name should contain maximum 50 characters.",
    }),
  ),
  email: z.optional(z.string().email({ message: "Invalid email address" })),
  phone: z.optional(
    z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters" })
      .max(15, {
        message: "Phone number should contain maximum 15 characters.",
      }),
  ),
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
    }, "Check-out date must be greater than check-in date")
    .refine((date) => {
      return date.from > yesterday() && date.to > new Date();
    }, "Dates must be greater than or equal to tomorrow")
    .refine((date) => {
      const lastDay = new Date();
      // 1 months from now
      lastDay.setMonth(lastDay.getMonth() + 1);
      return date.to <= lastDay;
    }, "Dates must be less than or equal to 1 months from now"),
});
