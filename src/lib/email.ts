import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { verificationEmailTemplate } from "@/templates/verification-email";
import { resetPasswordEmailTemplate } from "@/templates/reset-password-email";
import { contactUsEmailTemplate } from "@/templates/contact-us-email";

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
  const { MAIL_PASSWORD, MAIL_USERNAME } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });

  try {
    const transportResult = await transporter.verify();
    if (!transportResult) {
      return false;
    }
    const sendEmail = await transporter.sendMail({
      from: `The Villa Hotel <${MAIL_USERNAME}>`,
      sender: MAIL_USERNAME,
      replyTo: replyTo || MAIL_USERNAME,
      to,
      subject,
      html: body,
    });
    if (sendEmail) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export async function setupVerificationEmailTemplate(
  verificationLink: string,
  userName: string,
) {
  const template = handlebars.compile(verificationEmailTemplate);
  const htmlBody = template({ verificationLink, userName });
  return htmlBody;
}

export async function setupResetPasswordEmailTemplate(
  resetLink: string,
  userName: string,
) {
  const template = handlebars.compile(resetPasswordEmailTemplate);
  const htmlBody = template({ resetLink, userName });
  return htmlBody;
}

export async function setupContactUsEmail(
  name: string,
  email: string,
  message: string,
) {
  const template = handlebars.compile(contactUsEmailTemplate);
  const htmlBody = template({ name, email, message });
  return htmlBody;
}
