"use client";

import { Dispatch, FC, SetStateAction,useEffect,useState } from "react";
import { Button } from "@/components";
import { fetchFoodDetailsByIds, tableReservation, getTableIdByTableId } from "@/actions/utils/tableReservation"; // Import the fetching price by id function

interface MenuItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export const OrderSummary: FC<{
    setCurrentStep: Dispatch<SetStateAction<number>>;
    selectedMenu: { id: string; quantity: number }[];
    reservationData: { name: string; email: string; phone: string; table: string } | null;
    availabilityData: { date: Date; time_slot: string } | null;
    remark:string;
}> = ({ setCurrentStep, selectedMenu,reservationData,availabilityData, remark}) => {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const ids = selectedMenu.map((item) => item.id);
            const result = await fetchFoodDetailsByIds(ids);
            if (result.success && result.data) {
                const itemsWithQuantity = result.data.map((item: any) => {
                    const selectedItem = selectedMenu.find((i) => i.id === item.id);
                    return { ...item, quantity: selectedItem?.quantity || 0 };
                });
                setMenuItems(itemsWithQuantity);
            } else {
                console.error(result.message);
            }
        };

        fetchDetails();
    }, [selectedMenu]);

    // Function to calculate total cost
    const calculateTotalCost = (): number => {
        return menuItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleConfirmReservation = async () => {
        console.log("came inside the handleConfirmReservation function");
        if (!reservationData || !availabilityData) {
            console.error("Reservation data or availability data is missing");
            return;
        }
        const totalCost = calculateTotalCost() + 10; // Including the fixed tax amount
        console.log("total cost calculated");
        console.log(remark);
        const tableResult = await getTableIdByTableId(reservationData.table);
        if (!tableResult.success || !tableResult.data) {
            console.error(tableResult.message);
            return;
        }

        const table = tableResult.data.id;

        const result = await tableReservation({
            table,
            name: reservationData.name,
            email: reservationData.email,
            phone: reservationData.phone,
            date: availabilityData.date,
            time_slot: availabilityData.time_slot,
            selectedMenu: selectedMenu.map((item) => ({
                ...item,
                price: menuItems.find((menuItem) => menuItem.id === item.id)?.price || 0,
            })),
            total: totalCost, // Pass the total cost here
            remark, // Add remark if needed
        });
        console.log("function called");
        if (result.success) {
            console.log("Reservation successful", result.data);
        } else {
            console.log("not success");
            console.error(result.message);
        }
    };

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
                                {/* Display selected menu items */}
                                {menuItems.map((item) => (
                                        <div className="mb-4" key={item.id}>
                                            <div className="flex justify-between">
                                                <h1 className="text-gray-800 dark:text-white text-sm lg:text-lg pb-2">
                                                    {item.name}
                                                </h1>
                                            </div>
                                            <div className="text-lg font-medium text-green-600">
                                            ${item.price.toFixed(2)}
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</div>
                                        </div>
                                    ))}
                                <hr className="border-black border-1 mb-4" />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-6">
                            <div className="py-3 px-6 md:px-12">
                                <div className="flex items-center justify-center text-xl font-semibold mb-6">
                                    <h1>Order summary</h1>
                                </div>
                                {/* Calculate and display subtotal, taxes, and total */}
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${calculateTotalCost()}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>$10</span> {/* Assuming fixed tax amount */}
                                </div>
                                <hr className="border-black border-1 my-4" />
                                <div className="flex justify-between text-xl font-semibold">
                                    <span>Total</span>
                                    <span>${calculateTotalCost() + 10}</span> {/* Total = Subtotal + Taxes */}
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
                        onClick={handleConfirmReservation}
                        className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
                    >
                        Confirm Reservation
                    </Button>
                </div>
            </section>
        </>
    );
};
