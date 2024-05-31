"use client";

import { FC } from "react";
import { RestaurantForm, RestaurantHero, Tables } from "@/components";

export const Restaurant: FC = () => {
  return (
    <section className="">
      <div>
        {/* hero section */}
        <RestaurantHero />

        {/* view table structure and plan */}
        <Tables />
      </div>
      {/* restaurant form */}
      <RestaurantForm />
    </section>
  );
};
