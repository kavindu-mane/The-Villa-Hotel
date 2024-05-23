"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@/components";

export const OrderSummary: FC<{ setCurrentStep: Dispatch<SetStateAction<number>> }> = ({ setCurrentStep }) => {
    return (
        <>
            <section>
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-gray-300 bg-white">
                        <div className="col-span-1 md:col-span-6 border-r-0 md:border-r-2 border-gray-300">
                            <div className="py-3 px-6 md:px-12">
                                <div className="flex items-center justify-center text-xl font-semibold mb-6">
                                    <h1>My order</h1>
                                </div>
                                {/* Looping start */}
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-800 dark:text-white text-sm lg:text-lg pb-2">
                                            Chicken Spagetti
                                        </h1>
                                    </div>
                                    <div className="text-lg font-medium text-green-600">$32</div>
                                    <div className="text-gray-600 dark:text-gray-300">Quantity: 2</div>
                                </div>
                                <hr className="border-black border-1 mb-4" />
                                {/* Looping end */}
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-800 dark:text-white text-sm lg:text-lg pb-2">
                                            Seafood Fried Rice
                                        </h1>
                                    </div>
                                    <div className="text-lg font-medium text-green-600">$40</div>
                                    <div className="text-gray-600 dark:text-gray-300">Quantity: 1</div>
                                </div>
                                <hr className="border-black border-1 mb-4" />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-6">
                            <div className="py-3 px-6 md:px-12">
                                <div className="flex items-center justify-center text-xl font-semibold mb-6">
                                    <h1>Order summary</h1>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>$128</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>$10</span>
                                </div>
                                <hr className="border-black border-1 my-4" />
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
        </>
    );
};
