"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

export const CopyRight: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "z-[1] mt-10 w-full border-t border-t-emerald-300 pt-5 text-center",
        className,
      )}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} The Villa Hotel. All rights reserved.
      </p>
    </div>
  );
};
