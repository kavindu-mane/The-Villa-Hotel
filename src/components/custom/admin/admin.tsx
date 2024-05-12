"use client";

import { FC } from "react";
import {
  AdminStatistics,
  UpcomingReservationDetails,
  UpcomingReservations,
} from "@/components";

export const AdminDashboard: FC = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
        {/* statistics */}
        <AdminStatistics />
        {/* upcoming reservations table */}
        <UpcomingReservations />
      </div>
      {/* upcoming reservations details card */}
      <UpcomingReservationDetails />
    </main>
  );
};
