"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@/components";

export const OrderSummary: FC<{
  setCurrentStep: Dispatch<SetStateAction<number>>;
}> = ({ setCurrentStep }) => {
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 border-gray-300 bg-white md:grid-cols-12">
          <div className="col-span-1 border-r-0 border-gray-300 md:col-span-6 md:border-r-2">
            <div className="px-6 py-3 md:px-12">
              <div className="mb-6 flex items-center justify-center text-xl font-semibold">
                <h1>My order</h1>
              </div>
              {/* Looping start */}
              <div className="mb-4">
                <div className="flex justify-between">
                  <h1 className="pb-2 text-sm text-gray-800 dark:text-white lg:text-lg">
                    Chicken Spagetti
                  </h1>
                </div>
                <div className="text-lg font-medium text-green-600">$32</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Quantity: 2
                </div>
              </div>
              <hr className="border-1 mb-4 border-black" />
              {/* Looping end */}
              <div className="mb-4">
                <div className="flex justify-between">
                  <h1 className="pb-2 text-sm text-gray-800 dark:text-white lg:text-lg">
                    Seafood Fried Rice
                  </h1>
                </div>
                <div className="text-lg font-medium text-green-600">$40</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Quantity: 1
                </div>
              </div>
              <hr className="border-1 mb-4 border-black" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-6">
            <div className="px-6 py-3 md:px-12">
              <div className="mb-6 flex items-center justify-center text-xl font-semibold">
                <h1>Order summary</h1>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>$128</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Taxes</span>
                <span>$10</span>
              </div>
              <hr className="border-1 my-4 border-black" />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>$118</span>
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
          type="submit"
          className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
        >
          Confirm Reservation
        </Button>
      </div>
    </section>
  );
};
