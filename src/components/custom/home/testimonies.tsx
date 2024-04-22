"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { FC } from "react";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const Testimonies: FC = () => {
  const testimonies = [
    {
      date: "02 Mar , 2024",
      stars: 5,
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem possimus voluptatibus quasi eligendi, exercitationem quis totam asperiores a? Rerum cupiditate architecto omnis sit tenetur rem perspiciatis ducimus porro ipsam.",
      name: "Anthony Joshua",
      avatar: "",
    },
    {
      date: "02 Mar , 2024",
      stars: 5,
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem possimus voluptatibus quasi eligendi, exercitationem quis totam asperiores a? Rerum cupiditate architecto omnis sit tenetur rem perspiciatis ducimus porro ipsam.",
      name: "Anthony Joshua",
      avatar: "",
    },
    {
      date: "02 Mar , 2024",
      stars: 5,
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem possimus voluptatibus quasi eligendi, exercitationem quis totam asperiores a? Rerum cupiditate architecto omnis sit tenetur rem perspiciatis ducimus porro ipsam.",
      name: "Anthony Joshua",
      avatar: "",
    },
  ];

  return (
    <section className="z-10 w-full px-5 pt-16">
      {/* title */}
      <h1 className="mb-5 text-center text-3xl font-medium">Testimonies</h1>
      {/* testimonies */}
      <div className="py-5 flex gap-x-8">
        {testimonies.map((testimony, index) => (
          <div
            key={index}
            className="flex w-96 flex-col gap-y-8 rounded-md border-[1px] border-gray-100 bg-white p-5 shadow drop-shadow-lg"
          >
            {/* top */}
            <div className="flex w-full justify-between">
              <p className="">{testimony.date}</p>
              <div className="flex text-amber-400">
                {Array.from({ length: testimony.stars }).map((_, index) => {
                  return <FaStar key={index} />;
                })}
              </div>
            </div>
            {/* middle */}
            <div className="flex flex-col">
              <FaQuoteLeft className="h-8 w-8 self-start text-emerald-500" />
              <p className="text-center">{testimony.content}</p>
              <FaQuoteRight className="h-8 w-8 self-end text-emerald-500" />
            </div>
            {/* bottom */}
            <div className="flex items-center gap-x-3">
              <Avatar>
                <AvatarImage src={testimony.avatar} />
                <AvatarFallback>{testimony.name}</AvatarFallback>
              </Avatar>
              <span className="">{testimony.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
