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
    .min(1, { message: "Password field has to be filled." })
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
