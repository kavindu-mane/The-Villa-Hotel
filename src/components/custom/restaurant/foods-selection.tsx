"use client";

import { Dispatch, FC, SetStateAction ,useState,useEffect} from "react";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components";
import Image from "next/image";
import { z } from "zod";
import { RestaurantMenuSchema, RestaurantRemarkSchema } from "@/validations";
import { errorTypes } from "@/types";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantMenuSelection, fetchMenuItems } from "@/actions/utils/tableReservation"; // Import the menu selection function


export const FoodsSelections: FC<{
  selectedMenu: z.infer<typeof RestaurantMenuSchema> | null;
  onMenuItemAdd: (id: string) => void;
  onMenuItemRemove: (id: string) => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  errors: errorTypes;
  reservationData: { name: string; email: string; phone: string; table: string } | null;
  availabilityData: { date: Date; time_slot: string } | null;
  nextStep: (step: number, data: any) => void; // Function to go to the next step
}> = ({
  selectedMenu,
  onMenuItemAdd,
  onMenuItemRemove,
  setCurrentStep,
  errors,
  reservationData,
  availabilityData,
  nextStep,
}) => {
  // form hooks
  const remarkForm = useForm<z.infer<typeof RestaurantRemarkSchema>>({
    resolver: zodResolver(RestaurantRemarkSchema),
    defaultValues: {
      remark: "",
    },
  });

  const [menuItems, setMenuItems] = useState<any[]>([]); // State to store the menu items

  useEffect(() => {
    // Fetch menu items when the component mounts
    fetchMenu();
  }, []);

  // Function to fetch menu items
  const fetchMenu = async () => {
    try {
      const result = await fetchMenuItems(); // Call the fetchMenuItems function
      if (result.success) {
        setMenuItems(result.data || []); // Set the fetched menu items in the state
      } else {
        console.error("Error fetching menu items:", result.message);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const [localErrors, setLocalErrors] = useState<errorTypes>({});

  const handleSubmit = async (remarkData: z.infer<typeof RestaurantRemarkSchema>) => {
    console.log("Reservation form handleSubmit called with data:", remarkData);
    setLocalErrors({});
    try {
      const menuData = {
        menu: selectedMenu?.menu || [],
        remark: remarkData.remark,
      };

      const result = await restaurantMenuSelection(menuData);
      console.log("Reservation result:", result);

      if (result.success) {
        // Pass both data to the next step
        nextStep(4, { menu: selectedMenu?.menu || [], availabilityData, reservationData, remark: remarkData.remark });
      } else {
        setLocalErrors({ message: result.message });
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      setLocalErrors({ message: "Internal server error. Please try again later." });
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap justify-center gap-3">
        {menuItems.map((menu) => ( // Render menu items
          <div
            key={menu.id}
            className="flex w-80 flex-col items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-3 shadow-lg drop-shadow-lg"
          >
            <div className="">
              <Image
                src={menu.images}
                alt={menu.name}
                width={500}
                height={500}
                className="h-40 w-full rounded-t-lg object-cover"
              />
              <div className="flex flex-col items-start justify-center gap-2">
                <h3 className="text-lg font-medium text-gray-800">
                  {menu.name}
                </h3>
                <p className="text-sm font-normal text-gray-600">
                  {menu.description}
                </p>
                <p className="text-sm font-normal text-gray-600">
                  Price: ${menu.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Increase and decrease button */}
            <div className="mt-5 flex w-full justify-end">
              <div className="flex">
                {/* Add button */}
                <Button
                  disabled={
                    selectedMenu?.menu.find((m) => m.id === menu.id)
                      ?.quantity === 5
                  }
                  className="h-8 w-8 rounded-e-none rounded-s-lg border-none bg-primary text-xl !text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  onClick={() => onMenuItemAdd(menu.id)}
                  variant="outline"
                >
                  +
                </Button>
                {/* Quantity */}
                <p className="flex h-8 w-8 items-center justify-center bg-gray-200 font-medium">
                  {selectedMenu?.menu.find((m) => m.id === menu.id)
                    ?.quantity || 0}
                </p>
                {/* Remove button */}
                <Button
                  disabled={
                    selectedMenu?.menu.find((m) => m.id === menu.id) ===
                    undefined
                  }
                  className="h-8 w-8 rounded-e-lg rounded-s-none border-none bg-primary text-xl !text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  onClick={() => onMenuItemRemove(menu.id)}
                  variant="outline"
                >
                  -
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Form {...remarkForm}>
          <form className="mt-8 flex w-full max-w-2xl  items-center justify-center gap-5">
            {/* remark */}
            <FormField
              control={remarkForm.control}
              name="remark"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex w-full items-start justify-between">
                    Special requirements
                    <span className="text-xs">{field.value?.length}/500</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={8}
                      maxLength={500}
                      className="bg-white"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors?.remark && errors?.remark[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="mt-10 flex w-full justify-between">
        {/* back button */}
        <Button
          onClick={() => setCurrentStep(2)}
          className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2 border border-primary bg-transparent text-primary hover:text-white"
        >
          Previous
        </Button>

        <Button
          onClick={remarkForm.handleSubmit(handleSubmit)}
          className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
