import { FC } from "react";
import { CeoMessage } from "./ceo-message";
import { Description } from "./description";
import { Headings } from "@/components";
import Image from "next/image";
import { Line } from "./line";
import { AboutFacilities } from "./about-facilities";

export const About: FC = () => {
  return (
    <section className="contact flex flex-col items-center justify-center gap-y-5 p-2 py-16  text-slate-900 lg:gap-y-10">
      <Headings
        title="Connecting Through Passion"
        description="Discover the heartbeat behind our journey, driven by a shared love for innovation and community."
      />
      <div className="flex w-full flex-col items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
        <Image
          src="/images/img_12.jpg"
          alt="description"
          className=""
          width={500}
          height={300}
        />
        <Description />
      </div>
      <Line />

      <div className="flex w-full flex-col items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
        <CeoMessage />
        <Image
          src="/images/img_36.jpg"
          alt="description"
          className=""
          width={500}
          height={300}
        />
      </div>
      <Line />
      <div className="flex w-full flex-col items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
        <Image
          src="/images/img_17.jpg"
          alt="description"
          className=""
          width={500}
          height={300}
        />
        <AboutFacilities />
      </div>
      <Line />
    </section>
  );
};
