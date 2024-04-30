"use client";

import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui";
import Image from "next/image";
import { CopyRight } from "./copyright";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const socialLinks = [
  {
    name: "Facebook",
    href: "/",
  },
  {
    name: "Instagram",
    href: "/",
  },
  {
    name: "Booking.com",
    href: "/",
  },
  {
    name: "Twitter",
    href: "/",
  },
];

const quickLinks = [
  {
    name: "Take a tour",
    href: "/",
  },
  {
    name: "Contact",
    href: "/",
  },
  {
    name: "About",
    href: "/",
  },
  {
    name: "Rooms",
    href: "/",
  },
];

export const Footer: FC = () => {
  return (
    <section className="relative mt-10 flex w-full flex-col items-center bg-primary px-5 py-10 text-white">
      {/* footer items */}
      <div className="z-[1] flex w-full max-w-screen-2xl flex-wrap">
        <div className="flex w-full flex-col p-5 px-0 sm:px-5 md:w-1/2 xl:w-1/4">
          {/* brand */}
          <h2
            className={cn(
              "mb-5 text-3xl font-bold md:text-3xl",
              dancingScript.className,
            )}
          >
            The Villa Hotel
          </h2>
          {/* description */}
          <p className="">
            The Villa Hotel is a A Grade guest house located in the Unawatuna
            beach area and is close to all the major tourist attractions. The
            hotel is known for its luxurious rooms and excellent services.
          </p>
        </div>

        <div className="flex w-full flex-col p-5 px-0 sm:px-5 md:w-1/2 xl:w-1/4">
          <h2 className="text-lg font-medium">Quick Links</h2>
          <div className="mt-8 flex flex-col gap-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="duration-200 hover:translate-x-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col p-5 px-0 sm:px-5 md:w-1/2 xl:w-1/4">
          <h2 className="text-lg font-medium">Social Media</h2>
          <div className="mt-8 flex flex-col gap-y-3">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="duration-200 hover:translate-x-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col p-5 px-0 sm:px-5 md:w-1/2 xl:w-1/4">
          <h2 className="text-lg font-medium">News Letter</h2>
          <div className="mt-8 flex flex-col gap-y-3">
            <p className="">
              Kindly subscribe to our newsletter to get the latest deals on our
              rooms and vacation discount.
            </p>
            <div className="relative flex w-full gap-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-white px-3 py-3 text-slate-950"
              />
              <Button className="absolute right-1.5 top-1.5 rounded-lg px-3 py-2 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* copy right */}
     <CopyRight/>

      {/* waves pattern */}
      <Image
        src="/images/waves.svg"
        alt="waves"
        width={1920}
        height={100}
        className="absolute bottom-0 h-full object-cover opacity-10"
      />
    </section>
  );
};
