"use client";

import { FC } from "react";
import { ExploreCards, ExploreHero } from "@/components";

export const Explore: FC = () => {
  return (
    <section className="">
      {/* hero section */}
      <ExploreHero />

      {/* restaurant form */}
      <ExploreCards />
    </section>
  );
};
