import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { verificationEmailTemplate } from "@/templates/verification-email";
import { resetPasswordEmailTemplate } from "@/templates/reset-password-email";
import { contactUsEmailTemplate } from "@/templates/contact-us-email";


// send emails function
export const sendEmails = async ({
  to,
  subject,
  body,
  replyTo,
}: {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}) => {
  // get email credentials from env
  const { MAIL_PASSWORD, MAIL_USERNAME } = process.env;

  // create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });

  try {
    // verify transporter
    const transportResult = await transporter.verify();
    if (!transportResult) {
      return false;
    }
    // send email
    const sendEmail = await transporter.sendMail({
      from: `The Villa Hotel <${MAIL_USERNAME}>`,
      sender: MAIL_USERNAME,
      replyTo: replyTo || MAIL_USERNAME,
      to,
      subject,
      html: body,
    });
    // if email sent
    if (sendEmail) {
      return true;
    }
    return false;
  } catch (e) {
    // if error
    console.log(e);
    return false;
  }
};

// setup email templates with handlebars for verification
export async function setupVerificationEmailTemplate(
  verificationLink: string,
  userName: string,
) {
  const template = handlebars.compile(verificationEmailTemplate);
  const htmlBody = template({ verificationLink, userName });
  return htmlBody;
}

// setup email templates with handlebars for reset password
export async function setupResetPasswordEmailTemplate(
  resetLink: string,
  userName: string,
) {
  const template = handlebars.compile(resetPasswordEmailTemplate);
  const htmlBody = template({ resetLink, userName });
  return htmlBody;
}

// setup email templates with handlebars for contact us
export async function setupContactUsEmail(
  name: string,
  email: string,
  message: string,
) {
  const template = handlebars.compile(contactUsEmailTemplate);
  const htmlBody = template({ name, email, message });
  return htmlBody;
}
