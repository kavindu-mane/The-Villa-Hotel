"use client";

import { ContentWrapperAnimation } from "@/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface ContentWrapperProps {
  topic?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ContentWrapper: FC<ContentWrapperProps> = ({
  topic,
  children,
  className,
}) => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <div
      className={cn(
        "mb-5 rounded-lg border-[1px] bg-white p-2 px-3 shadow-sm drop-shadow-md dark:bg-slate-800/25",
        className,
      )}
    >
      {/* heading */}
      <div className="flex items-center justify-between">
        {/* title */}
        <div className="flex items-center">
          {topic && (
            <h2 className="font-Poppins w-full max-w-44 truncate text-[1rem] font-medium sm:max-w-96">
              {topic}
            </h2>
          )}
        </div>

        {/* down arrow icon */}
        <div className="flex items-center gap-x-2">
          <IoIosArrowUp
            className="h-8 w-8 cursor-pointer p-2"
            onClick={() => setIsCollapse(!isCollapse)}
          />
        </div>
      </div>
      <motion.div
        className={"overflow-hidden"}
        animate={isCollapse ? "closed" : "open"}
        layout
        variants={ContentWrapperAnimation}
        transition={{ duration: 0.3, ease: "linear" }}
        initial="closed"
      >
        <div className="px-2 pb-2 pt-5">{children}</div>
      </motion.div>
    </div>
  );
};
