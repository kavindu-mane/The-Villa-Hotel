"use client";

import { Avatar, AvatarFallback, AvatarImage, Button } from "../..";
import { testimonies } from "@/constants";
import { motion, useMotionValue } from "framer-motion";
import { FC, RefObject, useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const Testimonies: FC = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [grabWidth, setGrabWidth] = useState(0);
  const [btnClicked, setBtnClicked] = useState(false);
  // refs
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const position = useMotionValue(0);

  // left and right scroll functions
  const scrollLeft = () => {
    const prevPosition = position.getPrevious() ?? 0;
    if (parentRef.current) {
      prevPosition >= -300
        ? position.set(-grabWidth)
        : position.set(position.get() + 300);
      setBtnClicked(true);
      setTimeout(() => {
        setBtnClicked(false);
      }, 300);
    }
  };

  const scrollRight = () => {
    const prevPosition = position.getPrevious() ?? 0;
    if (parentRef.current) {
      prevPosition <= -grabWidth + 300
        ? position.set(0)
        : position.set(position.get() - 300);
      setBtnClicked(true);
      setTimeout(() => {
        setBtnClicked(false);
      }, 300);
    }
  };

  // check if child is overflowing parent
  const isOverflowing = (
    parentRef: RefObject<HTMLDivElement>,
    childRef: RefObject<HTMLDivElement>,
  ) => {
    const parent = parentRef.current;
    const child = childRef.current;

    if (!parent || !child) return false;
    return child.offsetWidth > parent.offsetWidth;
  };

  // get current child width
  const getGrabWidth = () => {
    const child = childRef.current?.offsetWidth || 0;
    const parent = parentRef.current?.offsetWidth || 0;
    setGrabWidth(child - parent);
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
    <section className="z-10 w-full px-5 pt-16">
      {/* title */}
      <h1 className="mb-5 text-center text-3xl font-medium">Testimonies</h1>
      {/* testimonies */}
      <div
        ref={parentRef}
        className="relative flex w-full cursor-grab items-center justify-start overflow-x-hidden py-5 active:cursor-grabbing"
      >
        <motion.div
          ref={childRef}
          drag
          dragElastic={{ top: 0, bottom: 0 }}
          dragConstraints={{
            top: 0,
            left: isOverflow ? grabWidth * -1 : 0,
            right: 0,
            bottom: 0,
          }}
          className="flex gap-x-5 sm:gap-x-10"
          onDragEnd={(e, { offset }) => {
            position.set(position.get() + offset.x);
          }}
          animate={btnClicked && { x: position.get() }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 45,
          }}
        >
          {testimonies.map((testimony, index) => (
            <div
              key={index}
              className="flex w-80 flex-col gap-y-8 rounded-md border-[1px] border-gray-100 bg-white p-5 shadow drop-shadow-lg sm:w-96"
            >
              {/* top */}
              <div className="flex w-full justify-between">
                <p className="">{testimony.date}</p>
                <div className="flex text-amber-400">
                  {Array.from({ length: testimony.stars }).map((_, index) => {
                    return <FaStar key={index} />;
                  })}
                </div>
              </div>
              {/* middle */}
              <div className="flex flex-col">
                <FaQuoteLeft className="h-8 w-8 self-start text-emerald-500" />
                <p className="text-center">{testimony.content}</p>
                <FaQuoteRight className="h-8 w-8 self-end text-emerald-500" />
              </div>
              {/* bottom */}
              <div className="flex items-center gap-x-3">
                <Avatar>
                  <AvatarImage src={testimony.avatar} />
                  <AvatarFallback>
                    {testimony.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="">{testimony.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* buttons */}
      <div className="flex justify-end gap-x-3">
        <Button
          className="h-10 w-10 rounded-full bg-primary/60 p-2"
          onClick={scrollRight}
        >
          <IoChevronBack className="h-6 w-6" />
        </Button>
        <Button
          className="h-10  w-10 rounded-full bg-primary/60 p-2"
          onClick={scrollLeft}
        >
          <IoChevronForward className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};
