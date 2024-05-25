"use client";

import { FC } from "react";

export const Description: FC = () => {
  return (
    <section className=" items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
      <h1 className="text-4xl font-medium text-slate-950">
        The<span className="ms-2 text-emerald-500">V</span>illa
        <span className="ms-2 text-emerald-500">H</span>otel
      </h1>
      <h1 className="max-w-xl text-center text-5xl font-medium lg:max-w-lg lg:text-start lg:text-6xl pb-5">
        <span className="text-4xl">SINCE</span>{" "}
        <span className="text-emerald-500">1995</span>
      </h1>

      <div className="text-gray-500 items-center justify-center text-sm">
        Discover an exceptional experience at The Villa Hotel & Restaurant in
        Unawatuna, where style, service, and location come together seamlessly.
        Nestled along the pristine white sands of Unawatuna and overlooking the
        majestic Indian Ocean, our hotel offers a perfect blend of modern
        lifestyle and classic colonial charm. Immerse yourself in the elegance
        of our thoughtfully designed interiors, reminiscent of Sri Lanka&apos;s rich
        colonial past, while enjoying contemporary amenities and unparalleled
        service. Whether you&apos;re here to relax by the beach, indulge in gourmet
        dining, or explore the local culture, The Villa Hotel & Restaurant
        promises an unforgettable stay.
      </div>
    </section>
  );
};
