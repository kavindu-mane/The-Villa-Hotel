"use client";

import { BookingCard, Button, Headings, RoomsLocation, TableLocation } from "@/components";
import { FC, useEffect, useState } from "react";

export const Tables: FC = () => {
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
    <section className="flex flex-col items-center justify-center gap-y-4 italic text-gray-700 pb-2 pt-10">
      <Button
        onClick={() => setIsStructureShow(true)}
        className="bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500"
      >
        Table Layout
      </Button>

      {/* show  structure*/}
      {isStructureShow && (
        <TableLocation setIsStructureShow={setIsStructureShow} />
      )}
    </section>
  );
};
