"use client";

import { FC } from "react";
import { Headings } from "@/components";

export const ExploreHero: FC = () => {
  return (
    <header>
      <div
        className="h-[25rem] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/img_28.jpg')" }}
      >
        <div className="flex h-full w-full items-center justify-center bg-gray-900/40">
          <div className="text-white">
            <Headings
              title={"Things to Do"}
              description=" Uncover nearby wonders from our hotel's doorstep, offering
              endless exploration for every guest"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
