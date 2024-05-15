"use client";

import { FC } from "react";
import { AdminRoomsDetailsForm, AdminRoomsTable } from "@/components";

export const AdminRooms: FC = () => {
  return (
    <section className="grid w-full flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3 xl:gap-4 xl:p-0 2xl:p-2">
      <AdminRoomsTable />
      <AdminRoomsDetailsForm />
    </section>
  );
};
