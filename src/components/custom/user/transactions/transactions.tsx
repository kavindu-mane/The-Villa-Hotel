import { FC } from "react";
import { MyTransactionsTable } from "@/components";

export const Transactions: FC = () => {
  return (
    <section className="flex w-full flex-col items-center">
      <MyTransactionsTable />
    </section>
  );
};
