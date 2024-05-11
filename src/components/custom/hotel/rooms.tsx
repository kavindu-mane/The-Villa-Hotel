"use client";

import { BookingCard, Button, Headings, RoomsLocation } from "@/components";
import { FC, useEffect, useState } from "react";

export const Rooms: FC = () => {
  // is structure button state
  const [isStructureShow, setIsStructureShow] = useState(false);

  // use Effect for disable scroll
  useEffect(() => {
    const documentElement = document.documentElement.classList;
    if (isStructureShow) {
      documentElement.add("overflow-hidden");
    } else {
      documentElement.remove("overflow-hidden");
    }
  }, [isStructureShow]);

  return (
    <section className="flex w-full flex-col gap-y-8 px-5 py-16">
      {/* title */}
      <Headings
        title="Reservations"
        description="Book a room with us today and enjoy a comfortable stay in our luxurious hotel."
      />

      {/* booking card */}
      <BookingCard />

      {/* structure button */}
      <div className="flex flex-col items-center justify-center gap-y-4 italic text-gray-700">
        <p className="">
          Explore our hotel structure and find the perfect room for your stay.
        </p>
        <Button
          onClick={() => setIsStructureShow(true)}
          className="bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500"
        >
          Hotel Structure
        </Button>
      </div>

      {/* show  structure*/}
      {isStructureShow && (
        <RoomsLocation setIsStructureShow={setIsStructureShow} />
      )}
    </section>
  );
};
