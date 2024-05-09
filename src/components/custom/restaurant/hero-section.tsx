"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const RestaurantHero: FC = () => {
  return (
    <div className="relative flex items-center justify-center gap-5 lg:mt-10 lg:px-5">
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-y-4 bg-slate-900/40 px-5 backdrop-blur-[1px] lg:relative lg:bg-transparent lg:px-0">
        <h1 className="text-center text-2xl font-semibold text-white md:text-3xl lg:text-4xl lg:text-gray-800">
          Savor the Flavors, Reserve Your Table, <br />
          Order Your{" "}
          <span className="text-emerald-400 lg:text-green-600">Delights</span>
        </h1>
        <p className="mt-6 text-center text-gray-200 lg:text-gray-600">
          Are you craving an exquisite dining experience? Look no further! The
          Villa Hotel invites you to indulge in a culinary journey like no
          other. From mouthwatering cuisines to impeccable service, we ensure
          every visit is a delight for your senses.
        </p>

        <Link
          href={"#TableReserveForm"}
          className="w-full max-w-sm rounded-md bg-primary py-2 text-center text-white"
        >
          Book Now
        </Link>
      </div>

      <Image
        src="/images/img_24.jpg"
        width={1920}
        height={1080}
        alt="food"
        className="-z-10 h-auto min-h-96 w-full object-cover lg:w-1/2 lg:rounded-md"
      />
    </div>
  );
};
