"use server";

import { sendEmails } from "@/actions/utils/email";
import { contactUsEmailTemplate } from "@/templates/contact-us-email";
import { ContactUsSchema } from "@/validations";
import { z } from "zod";

/**
 * Server action for contact us form
 */

export const contactUs = async (values: z.infer<typeof ContactUsSchema>) => {
  try {
    // validate data in backend
    const validatedFields = ContactUsSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }

    // destructure data from validated fields
    const { name, email, message } = values;

    // setup email template
    const template = contactUsEmailTemplate(name, email, message);
    //get recipient email from env
    const to = process.env.CONTACT_US_EMAIL;

    // if recipient email is available
    if (to) {
      const isSend = await sendEmails({
        to: to,
        replyTo: email,
        subject: "Contact Us Form The Villa Hotel Website",
        body: template,
      });

      // if email not sent
      if (!isSend) {
        return {
          error: "Message not sent.Please try again",
        };
      }

      //  if no error
      return {
        success: "Message sent successfully",
      };
      // if recipient email is not available
    } else {
      return {
        error: "Something went wrong",
      };
    }
  } catch (error) {
    // if any error
    return {
      error: "Something went wrong",
    };
  }
};
