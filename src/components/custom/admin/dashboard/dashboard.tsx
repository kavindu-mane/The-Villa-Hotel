"use client";

import { FC, useState } from "react";
import {
  AdminStatistics,
  UpcomingReservationDetails,
  UpcomingReservations,
} from "@/components";

export const AdminDashboard: FC = () => {
  const [selectedReservation, setSelectedReservation] = useState<any | null>(
    null,
  );
  const [selectedReservationType, setSelectedReservationType] = useState<
    "room" | "table"
  >("room");

  return (
    <section className="grid flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3 xl:gap-4 xl:p-0 2xl:gap-8 2xl:p-2">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
        {/* statistics */}
        <AdminStatistics />
        {/* upcoming reservations table */}
        <UpcomingReservations
          selectedReservation={selectedReservation}
          setSelectedReservation={setSelectedReservation}
          selectedReservationType={selectedReservationType}
          setSelectedReservationType={setSelectedReservationType}
        />
      </div>
      {/* upcoming reservations details card */}
      <UpcomingReservationDetails
        selectedReservation={selectedReservation}
        selectedReservationType={selectedReservationType}
      />
    </section>
  );
};
