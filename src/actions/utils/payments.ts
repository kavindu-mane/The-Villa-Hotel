"use server";

import { db } from "@/lib/db";
import { BookingType } from "@prisma/client";

// add payment to reservation
export const addPaymentRecord = async (
  id: string,
  payment: number,
  paymentType: BookingType,
) => {
  try {
    const paymentRecord = await db.payments.create({
      data: {
        reservationId: id,
        amount: payment,
        paymentType,
      },
    });

    return paymentRecord;
  } catch (e) {
    return null;
  }
};
