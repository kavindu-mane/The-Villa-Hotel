"use server";

import nodemailer from "nodemailer";

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
