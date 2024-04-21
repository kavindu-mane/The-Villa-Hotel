import { FC } from "react";
import { Button } from "../ui";
import Image from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";
import { BookingCard } from "./booking-card";

export const HeroSection: FC = () => {
  return (
    <section className="relative flex h-full w-full flex-col gap-5 lg:flex-row lg:ps-5">
      {/* left side */}
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center px-2 text-white lg:relative lg:h-auto lg:w-1/2 lg:items-start lg:px-0 lg:text-slate-900">
        <h2 className="mb-10 text-xl">The Villa Hotel</h2>
        <h1 className="max-w-xl text-center text-5xl font-medium lg:max-w-lg lg:text-start lg:text-6xl">
          Hotel for Every Moment rich in emotion.
        </h1>
        <p className="my-4 text-center italic">
          The Villa Hotel is a luxury hotel located in the heart of the city.
        </p>

        {/* buttons */}
        <div className="mt-5 flex items-center gap-x-4">
          <Button className="h-10 rounded-full px-10">Book Now</Button>
          <Button className="flex gap-x-2 bg-transparent shadow-none hover:bg-transparent lg:text-slate-900">
            <PlayIcon className="h-10 w-10 rounded-full bg-white px-2.5 text-slate-700 lg:bg-slate-700 lg:text-white" />
            Take a Tour
          </Button>
        </div>
      </div>
      {/* right side */}
      <div className="-z-10 w-full overflow-hidden bg-slate-900 lg:w-1/2 lg:rounded-xl">
        <Image
          src="/images/img_19.jpg"
          alt="hero"
          className="h-full max-h-[45rem] w-full object-cover opacity-30 lg:rounded-xl lg:opacity-100"
          width={500}
          height={300}
        />
      </div>
      {/* bookings */}
      <BookingCard />
    </section>
  );
};
