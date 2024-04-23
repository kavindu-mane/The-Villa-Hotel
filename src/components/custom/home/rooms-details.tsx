"use client";

import { FC, RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { roomDetails } from "@/constants";

export const RoomsDetails: FC = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  // refs
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const isOverflowing = (
    parentRef: RefObject<HTMLDivElement>,
    childRef: RefObject<HTMLDivElement>,
  ) => {
    const parent = parentRef.current;
    const child = childRef.current;

    if (!parent || !child) return false;
    console.log(child.offsetWidth, parent.offsetWidth);
    return child.offsetWidth > parent.offsetWidth;
  };

  // get current child width
  const getGrabWidth = () => {
    const child = childRef.current?.offsetWidth || 0;
    const parent = parentRef.current?.offsetWidth || 0;
    return (child - parent) / 2 + 50;
  };

  // grab width handler use effect
  useEffect(() => {
    const handleResize = () => {
      setIsOverflow(isOverflowing(parentRef, childRef));
      getGrabWidth();
    };

    // Run once to set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="z-0 -my-[12rem] flex h-screen min-h-[35rem] w-screen flex-col justify-between bg-cover bg-fixed bg-center px-3 "
      style={{ backgroundImage: "url(/images/img_15.jpg)" }}
    >
      <div className="-mx-3 h-[20vh] w-screen bg-gray-50" />
      <div className="-mx-3 flex h-[60vh] min-h-[35rem] flex-col items-center justify-center space-y-2 bg-slate-950/70 px-2">
        {/* heading */}
        <h1 className="border-b-4 pb-3 text-3xl font-medium text-white">
          Luxuries Rooms
        </h1>
        {/* description */}
        <p className="text-white">All rooms are designed for your comfort</p>
        {/* card area */}
        <div
          ref={parentRef}
          className={`relative flex w-full cursor-grab items-center ${!isOverflow ? "justify-center" : "justify-start"} overflow-x-hidden active:cursor-grabbing`}
        >
          <motion.div
            ref={childRef}
            drag
            dragElastic={{ top: 0, bottom: 0 }}
            dragConstraints={{
              top: 0,
              left: isOverflow ? getGrabWidth() * -1 : 0,
              right: isOverflow ? getGrabWidth() : 0,
              bottom: 0,
            }}
            className="flex gap-x-10"
          >
            {roomDetails.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <div className="relative mt-10 h-96 w-96 rounded-md bg-white p-5">
                  <Image
                    src={card.image}
                    alt="room"
                    height={300}
                    width={300}
                    className="pointer-events-none flex h-[87%] w-full rounded-sm object-cover"
                  />
                  <h2 className="absolute right-5 top-7 rounded-s-full bg-emerald-600 py-1 pe-2 ps-4 text-lg font-medium text-white">
                    {card.title}
                  </h2>
                  <p className="pt-1 font-medium text-slate-900">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="-mx-3 h-[20vh] w-screen bg-gray-50" />
    </section>
  );
};
