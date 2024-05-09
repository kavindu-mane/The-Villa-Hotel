"use client";

import { FC } from "react";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import { Headings } from "@/components";

export const ContactUs: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-y-10 p-2 py-16  text-slate-900 lg:gap-y-20">
      {/* heading */}
      <Headings
        title="Get In Touch"
        description="Feel free to reach out to us with any questions, comments, or inquiries
        you may have. We're here to help!"
      />

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
