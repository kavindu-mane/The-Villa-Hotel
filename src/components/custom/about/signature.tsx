"use client";
import { FC } from "react";
import Image from "next/image";

export const Signature: FC = () => {
  return (
    <section className="items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
      <div className="flex items-center justify-between text-sm text-gray-400 gap-x-10">
        <div>
          <h1 className="text-slate-950">Ranjan Masakorala</h1>
          <h2 className="text-xs">CEO/Chairman</h2>
        
        </div>
        
          <Image
            src="/images/img_37.png"
            alt="description"
            className=""
            width={100}
            height={30}
          />
        
      </div>
    </section>
  );
};
