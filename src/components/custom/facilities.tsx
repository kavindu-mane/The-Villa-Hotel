import { FC } from "react";
import { FaWifi, FaParking } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { HiLightBulb } from "react-icons/hi";
import { GiDoubleFish } from "react-icons/gi";
import { LuAirVent } from "react-icons/lu";
import { MdEmojiFoodBeverage, MdLocalLaundryService } from "react-icons/md";

export const Facilities: FC = () => {
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
      icon: <HiLightBulb className="text-4xl" />,
      title: "24/7 Light",
    },
    {
      icon: <GiDoubleFish className="text-4xl" />,
      title: "Sea Food Market",
    },
    {
      icon: <LuAirVent className="text-4xl" />,
      title: "A/C",
    },
  ];

  return (
    <section className="w-full bg-white px-5 pt-14 text-center">
      {/* title */}
      <h2 className="text-3xl">Our Facilities</h2>
      {/* description */}
      <p className="mb-8 text-sm">
        We offer a wide range of facilities to make your stay as comfortable as
        possible.
      </p>
      {/* facilities */}
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex h-44 w-44 flex-col items-center justify-center bg-primary/15 text-primary duration-300 hover:bg-primary md:h-56 md:w-56"
          >
            <span className="duration-300 group-hover:text-white">
              {feature.icon}
            </span>
            <p className="mt-1 text-lg duration-300 group-hover:text-white">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
