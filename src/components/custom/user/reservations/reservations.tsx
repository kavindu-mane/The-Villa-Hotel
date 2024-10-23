import { FC } from "react";
import { MyReservationsTable } from "@/components";

export const Reservations: FC = () => {
  return (
    <section className="flex w-full flex-col items-center">
      <MyReservationsTable />
    </section>
  );
};
