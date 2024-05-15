"use client";

import { FC, useState } from "react";
import { AdminRoomsDetailsForm, AdminRoomsTable } from "@/components";
import { roomsDataTypes } from "@/types";

export const AdminRooms: FC = () => {
  const [isRefresh, setIsRefresh] = useState(true);
  const [data, setData] = useState<roomsDataTypes | undefined>();

  return (
    <section className="grid w-full flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3 xl:gap-4 xl:p-0 2xl:p-2">
      <AdminRoomsTable
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        setData={setData}
      />
      <AdminRoomsDetailsForm setIsRefresh={setIsRefresh} data={data} />
    </section>
  );
};
