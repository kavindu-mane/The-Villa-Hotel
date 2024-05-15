"use client";

import { FC } from "react";
import Image from "next/image";
import { exploreData } from "@/constants";

export const ExploreCards: FC = () => {
  return (
    <section className="dark:bg-gray-900">
      <div className="mx-auto flex flex-col gap-y-16 px-4 py-10 sm:px-6 md:px-10 [&>*:nth-child(odd)]:flex-row-reverse">
        {exploreData.map((data, index) => {
          return (
            <div key={index} className="lg:mx-6 lg:flex lg:items-center justify-between">
              <div className="w-full overflow-hidden rounded-3xl lg:mx-6 lg:w-1/3">
                <Image
                  src={data.image}
                  alt={data.title}
                  width={1920}
                  height={1080}
                  className="h-[20rem] w-full rounded-3xl object-cover object-center transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="mt-8 w-full lg:mt-0 lg:w-1/2 lg:px-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:w-96 lg:text-3xl">
                  {data.title}
                </h1>
                <div className="mt-6 w-full text-gray-500 dark:text-gray-400">
                  {data.description.map((desc, _index) => {
                    return (
                      <p key={"desc" + _index} className="indent-10">
                        {desc}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
