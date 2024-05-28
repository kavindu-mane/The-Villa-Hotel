import { NewReservations } from "@/components";
import Script from "next/script";

const ReservationsPage = () => {
  return (
    <>
      <Script
        src="https://www.payhere.lk/lib/payhere.js"
      />
      <NewReservations />
    </>
  );
};

export default ReservationsPage;
