"use client";

import { FC } from "react";
import { RestaurantForm, RestaurantHero } from "@/components";

export const Restaurant: FC = () => {
  return (
    <section className="">
      {/* hero section */}
      <RestaurantHero />

      {/* restaurant form */}
      <RestaurantForm />
    </section>
  );
};
