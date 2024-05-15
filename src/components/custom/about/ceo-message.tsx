"use client";

import { FC } from "react";
import { Signature } from "./signature";

export const CeoMessage: FC = () => {
  return (
    <section className="items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
      <div className="flex items-center justify-between flex-col sm:flex-row mb-10 sm:mb-0">
        <div className="">
          <h1 className="text-4xl font-medium text-slate-950">A Note From</h1>
          <h1 className="max-w-xl pb-5 text-5xl font-medium lg:max-w-lg lg:text-start lg:text-6xl">
            <span className="text-4xl"> Our</span>
            {"  "}
            <span className="text-emerald-500 ">CEO</span>
          </h1>
        </div>
        <Signature />
      </div>

      <div className="text-justify text-sm text-gray-500">
        A world of luxury and new discoveries await you located on Unawatuna at
        The Villa Hotel & Restaurant, Unawatuna. &quot;The Villa Hotel &
        Restaurant &quot; combines modern lifestyle with the classic decor of
        the colonial past of Sri Lanka. The Villa Hotel & Restaurant against the
        backdrop of Unawatuna Beach and the surrounding area provides the
        perfect coastal escape for romance and adventure. Relax your senses in
        the sparkling waters well complemented with a lazy sandy idyll in
        Unawatuna beach. Unawatuna is one of the biggest tourist destinations in
        Sri Lanka and is the most famous beach in the country. It is a lovely
        banana-shaped beach of golden sand and turquoise water, surrounded by
        green palm trees.The rolling waves to the east and west are perfect
        beginner to intermediate waves and the Indian Ocean with its watercolor
        of tropical blues. We welcome you to enjoy island life at one of the
        most sought hotels, The Villa Hotel and Restaurant, Unawatuna, Sri Lanka
      </div>
    </section>
  );
};
