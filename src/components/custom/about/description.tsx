"use client";

import { FC } from "react";

export const Description: FC = () => {
  return (
    <section className=" items-center justify-center gap-y-5 px-2 sm:px-5 md:flex-row md:gap-x-2 md:gap-y-0 lg:gap-x-5">
      <h1 className="text-4xl font-medium text-slate-950">
        The<span className="ms-2 text-emerald-500">V</span>illa
        <span className="ms-2 text-emerald-500">H</span>otel
      </h1>
      <h1 className="max-w-xl text-center text-5xl font-medium lg:max-w-lg lg:text-start lg:text-6xl">
        <span className="text-4xl">SINCE</span> 1995
      </h1>

      <div className="items-center justify-center">
        &quot;The Villa Hotel & Restaurant &quot; in Unawatuna is an exceptional
        experience in style, service and location. Facing the Indian Ocean and
        the white beach of Unawatuna, &quot;The Villa Hotel & Restaurant&quot;
        combines modern lifestyle with the classic decor of the colonial past of
        Sri Lanka
      </div>
    </section>
  );
};