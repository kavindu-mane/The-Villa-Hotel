"use client";

import { FC } from "react";
import { FaWifi, FaParking } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { HiLightBulb } from "react-icons/hi";
import { GiDoubleFish } from "react-icons/gi";
import { LuAirVent } from "react-icons/lu";
import { BsCalendarRangeFill } from "react-icons/bs";
import {
  MdEmojiFoodBeverage,
  MdLocalLaundryService,
  MdFitnessCenter,
} from "react-icons/md";

export const AboutFacilities: FC = () => {
  // features array
  const features = [
    {
      icon: <FaWifi className="text-4xl" />,
      title: "WIFI",
    },
    {
      icon: <IoFastFood className="text-4xl" />,
      title: "Foods",
    },
    {
      icon: <MdEmojiFoodBeverage className="text-4xl" />,
      title: "Beverages",
    },
    {
      icon: <FaParking className="text-4xl" />,
      title: "Parking Place",
    },
    {
      icon: <MdLocalLaundryService className="text-4xl" />,
      title: "Laundry",
    },
    {
      icon: <MdFitnessCenter className="text-4xl" />,
      title: "Fitness Centre",
    },
    {
      icon: <GiDoubleFish className="text-4xl" />,
      title: "Sea Food Market",
    },
    {
      icon: <LuAirVent className="text-4xl" />,
      title: "A/C",
    },
    {
      icon: <BsCalendarRangeFill className="text-4xl" />,
      title: "Tour Arrangement",
    },
  ];

  return (
    <section className="items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
      <div className="text-center">
        {/* description */}
        <p className="mb-8 text-justify text-sm text-gray-500">
          <span className="max-w-xl text-4xl font-medium text-slate-950 lg:max-w-lg lg:text-start lg:text-4xl">
            We <span className="text-5xl text-emerald-500">Ensure</span>
          </span>{" "}
          a comfortable and enjoyable stay with a range of top-notch facilities.
          Enjoy complimentary WiFi, delicious food and beverages, and convenient
          parking. Our services include laundry, 24/7 lighting, and
          air-conditioned rooms. Indulge in fresh seafood from the local market,
          and let us assist you with personalized tour arrangements. Experience
          the perfect blend of comfort and convenience with us.
        </p>
        {/* facilities */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex  flex-col items-center justify-center text-primary duration-300  "
            >
              <span className="">{feature.icon}</span>
              <p className="mt-1 text-lg ">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
