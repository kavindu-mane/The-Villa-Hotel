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
    <section className="relative flex h-screen w-screen flex-col justify-center gap-5 overflow-x-hidden">
      {/* image */}
      <div className="absolute -z-10 w-full overflow-hidden bg-slate-900">
        <Image
          src="/images/home_image.jpg"
          alt="hero"
          className="h-screen w-full object-cover opacity-40"
          width={1080}
          height={675}
        />
      </div>
      {/* text content */}
      <div className="my-20 flex w-full flex-col items-center justify-center px-2 text-white">
        <h2
          className={cn("mb-5 text-2xl font-semibold", dancingScript.className)}
        >
          The Villa Hotel
        </h2>
        <h1 className="text-center text-5xl font-medium lg:text-6xl">
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
          <Link href="/rooms">
            <Button className="h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-10 hover:from-cyan-700 hover:to-fuchsia-500">
              Find Room
            </Button>
          </Link>
        </div>
      </div>
      {/* bookings */}
      <div className="h-fit px-5">
        <BookingCard />
      </div>
    </section>
  );
};
