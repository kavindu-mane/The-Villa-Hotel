"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components";
import { tableReservationOrderSummery } from "@/types";

export const OrderSummary: FC<{
  setCurrentStep: Dispatch<SetStateAction<number>>;
  orderSummary: tableReservationOrderSummery | null;
  onCompleteTableReservation: (orderId?: string) => void;
}> = ({ setCurrentStep, orderSummary, onCompleteTableReservation }) => {

  const calculateTotalCost = () => {
    let total = 0;
    orderSummary?.foodReservation[0]?.foodReservationItems?.forEach((item) => {
      total += item.total;
    });

    total += orderSummary?.total || 0;

    return total.toFixed(2);
  };

  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 border-gray-300 bg-white md:grid-cols-12">
          <div className="col-span-1 border-r-0 border-gray-300 md:col-span-6 md:border-r-2">
            <div className="px-6 py-3 md:px-12">
              <div className="mb-6 flex items-center justify-center text-xl font-semibold">
                <h1>My order</h1>
              </div>
              {/* Display selected menu items */}
              {orderSummary?.foodReservation[0]?.foodReservationItems?.map(
                (item) => (
                  <div className="mb-4" key={item.foodId}>
                    <div className="flex justify-between">
                      <h1 className="pb-2 text-sm text-gray-800 dark:text-white lg:text-lg">
                        {item.foodId}
                      </h1>
                    </div>
                    <div className="text-lg font-medium text-green-600">
                      ${item.total.toFixed(2)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                ),
              )}
              <hr className="border-1 mb-4 border-black" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-6">
            <div className="px-6 py-3 md:px-12">
              <div className="mb-6 flex items-center justify-center text-xl font-semibold">
                <h1>Order summary</h1>
              </div>
              {/* Calculate and display subtotal, taxes, and total */}
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotalCost()}</span>
              </div>
              <hr className="border-1 my-4 border-black" />
              <div className="flex justify-between text-xl font-semibold">
                <span>Sub Total</span>
                <span>${calculateTotalCost()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full justify-between">
        {/* Back button */}
        <Button
          onClick={() => setCurrentStep(3)}
          className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2 border border-primary bg-transparent text-primary hover:text-white"
        >
          Previous
        </Button>

        <Button
          onClick={() => onCompleteTableReservation()}
          className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
        >
          Confirm Reservation
        </Button>
      </div>
    </section>
  );
};
