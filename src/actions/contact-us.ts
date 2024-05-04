"use server";

import { sendEmails, setupContactUsEmail } from "@/lib/email";
import { ContactUsSchema } from "@/validations";
import { z } from "zod";

export const contactUs = async (values: z.infer<typeof ContactUsSchema>) => {
  try {
    // validate data in backend
    const validatedFields = ContactUsSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }

    // destructure data
    const { name, email, message } = values;

    const template = await setupContactUsEmail(name, email, message);
    const to = process.env.CONTACT_US_EMAIL;

    if (to) {
      const isSend = await sendEmails({
        to: to,
        replyTo: email,
        subject: "Contact Us Form The Villa Hotel Website",
        body: template,
      });

      if (!isSend) {
        return {
          error: "Message not sent.Please try again",
        };
      }

      //  if no error
      return {
        success: "Message sent successfully",
      };
    } else {
      return {
        error: "Something went wrong",
      };
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
