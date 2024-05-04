"use client";

import { FC } from "react";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

export const ContactUs: FC = () => {
  return (
    <section className="contact flex flex-col items-center justify-center gap-y-10 p-2 text-slate-900  lg:gap-y-20 lg:py-20">
      {/* heading */}
      <div className="mx-auto max-w-screen-md text-center">
        <h2 className="text-3xl font-semibold md:text-5xl">Get In Touch</h2>
        <p className="mt-4">
          Feel free to reach out to us with any questions, comments, or
          inquiries you may have. We&apos;re here to help!
        </p>
      </div>

      {/* body */}
      <div className="flex w-full flex-col items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
        {/* left side */}
        <ContactInfo />

        {/* right side : form */}
        <ContactForm />
      </div>
    </section>
  );
};
