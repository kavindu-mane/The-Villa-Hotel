"use client";

import { FC } from "react";
import {
  AdminStatistics,
  UpcomingReservationDetails,
  UpcomingReservations,
} from "@/components";

export const AdminDashboard: FC = () => {
  return (
    <section className="grid flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3 xl:gap-4 xl:p-0 2xl:gap-8 2xl:p-2">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
        {/* statistics */}
        <AdminStatistics />
        {/* upcoming reservations table */}
        <UpcomingReservations />
      </div>
      {/* upcoming reservations details card */}
      <UpcomingReservationDetails />
    </section>
  );
};