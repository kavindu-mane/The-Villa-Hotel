"use client";

import { FC } from "react";
import { RestaurantForm, RestaurantHero, Table, Tables} from "@/components";

export const Restaurant: FC = () => {
  return (
    <section className="">
      {/* hero section */}
      <RestaurantHero />

      {/* view table structure and plan */}
      <Tables />

      {/* restaurant form */}
      <RestaurantForm />
    </section>
  );
};
