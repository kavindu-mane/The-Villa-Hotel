import { z } from "zod";

// form schema for room booking validation
export const BookingSchema = z.object({
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
      const today = new Date();
      return date >= today;
    }, "Date must be greater than or equal to tomorrow")
    .refine((date) => {
      const lastDay = new Date();
      // 1 months from now
      lastDay.setMonth(lastDay.getMonth() + 1);
      return date <= lastDay;
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
    .min(1, { message: "Phone field has to be filled." })
    .max(15, { message: "Phone should contain maximum 15 characters." }),
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
export const RestaurantRemarkSchema=z.object({
 remark: z
    .string()
    .max(500, { message: "Message should contain maximum 500 characters." })
    .optional()
    .or(z.literal("")),
})