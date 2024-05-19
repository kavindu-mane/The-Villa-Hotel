"use client";

import { FC, useState } from "react";
import { AdminRoomsDetailsForm, AdminRoomReservationTable } from "@/components";
import { Provider } from "react-redux";
import { adminStore } from "@/states/stores";

export const AdminRoomReservation: FC = () => {
  // state for is loading
  const [isLoading, setIsLoading] = useState(true);
  return (
    <section className="grid w-full flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3 xl:gap-4 xl:p-0 2xl:p-2">
      <Provider store={adminStore}>
        <AdminRoomReservationTable isLoading={isLoading} setIsLoading={setIsLoading} />
        <AdminRoomsDetailsForm isPending={isLoading} />
      </Provider>
    </section>
  );
};
