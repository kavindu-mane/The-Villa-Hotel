"use client";

import { BookingCard, Headings } from "@/components";
import { FC } from "react";

export const Rooms: FC = () => {
  return (
    <section className="flex w-full flex-col gap-y-8 px-5 py-16">
      {/* title */}
      <Headings
        title="Reservations"
        description="Book a room with us today and enjoy a comfortable stay in our luxurious hotel."
      />
      {/* booking card */}
      <BookingCard />
    </section>
  );
};
