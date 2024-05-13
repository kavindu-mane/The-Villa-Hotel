import { FC } from "react";
import { Button } from "@/components";
import Image from "next/image";
import { BookingCard } from "@/components";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const HeroSection: FC = () => {
  return (
    <section className="relative flex h-full w-full flex-col gap-5 overflow-x-hidden lg:flex-row lg:px-5">
      {/* left side */}
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center px-2 pb-56 text-white md:pb-36 lg:relative lg:h-auto lg:w-1/2 lg:items-start lg:px-0 lg:text-slate-900">
        <h2
          className={cn("mb-5 text-2xl font-semibold", dancingScript.className)}
        >
          The Villa Hotel
        </h2>
        <h1 className="max-w-xl text-center text-5xl font-medium lg:max-w-lg lg:text-start lg:text-6xl">
          Hotel for Every Moment rich in emotion.
        </h1>
        <p className="my-4 text-center italic">
          The Villa Hotel is a luxury hotel located in the beautiful Unawatuna
          beach in Sri Lanka.
        </p>

        {/* buttons */}
        <div className="mt-5 flex items-center gap-x-4">
          <Link href="/restaurant">
            <Button className="h-10 rounded-full px-10">Restaurant</Button>
          </Link>
          <Link href="/tour">
            <Button className="h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-10 hover:from-cyan-700 hover:to-fuchsia-500">
              Take a Tour
            </Button>
          </Link>
        </div>
      </div>
      {/* right side */}
      <div className="-z-10 w-full overflow-hidden bg-slate-900 lg:w-1/2 lg:rounded-md">
        <Image
          src="/images/img_19.jpg"
          alt="hero"
          className="h-[55rem] w-full object-cover opacity-30 lg:h-[45rem] lg:rounded-md lg:opacity-100"
          width={500}
          height={300}
        />
      </div>
      {/* bookings */}
      <div className="absolute bottom-10 end-1 start-1 md:end-5 md:start-5 lg:bottom-20">
        <BookingCard />
      </div>
    </section>
  );
};
