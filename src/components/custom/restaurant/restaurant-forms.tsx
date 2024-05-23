"use client";

import {
  AvailabilityForm,
  FoodsSelections,
  RestaurantReservationForm,
  OrderSummary,
} from "@/components";
import { tomorrow } from "@/utils";
import {
  RestaurantAvailabilitySchema,
  RestaurantMenuSchema,
  RestaurantReservationSchema,
} from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { errorTypes } from "@/types";

// default value for errors
const errorDefault: errorTypes = {
  date: [],
  time_slot: [],
  name: [],
  email: [],
  remark: [],
  phone: [],
  table: [],
  menu: [],
  message: "",
};

export const RestaurantForm: FC = () => {
  // is loading state
  const [isLoading, setIsLoading] = useState(false);
  // error state
  const [errors, setErrors] = useState(errorDefault);
  //current step
  const [currentStep, setCurrentStep] = useState(1);
  // availability data
  const [availabilityData, setAvailabilityData] = useState<z.infer<
    typeof RestaurantAvailabilitySchema
  > | null>(null);
  // reservation data
  const [reservationData, setReservationData] = useState<z.infer<
    typeof RestaurantReservationSchema
  > | null>(null);
  // menu data
  const [selectedMenu, setSelectedMenu] = useState<z.infer<
    typeof RestaurantMenuSchema
  > | null>(null);

  // form hooks
  const availabilityForm = useForm<
    z.infer<typeof RestaurantAvailabilitySchema>
  >({
    resolver: zodResolver(RestaurantAvailabilitySchema),
    defaultValues: {
      date: tomorrow(),
      time_slot: "Morning (9:00 AM - 12:00 PM)",
    },
  });

  const reservationForm = useForm<z.infer<typeof RestaurantReservationSchema>>({
    resolver: zodResolver(RestaurantReservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      table: undefined,
    },
  });

  // availability form submit
  const onAvailabilityFormSubmit = (
    data: z.infer<typeof RestaurantAvailabilitySchema>,
  ) => {
    setAvailabilityData(data);
    setCurrentStep(2);
  };

  // reservation form submit
  const onReservationFormSubmit = (
    data: z.infer<typeof RestaurantReservationSchema>,
  ) => {
    setReservationData(data);
    setCurrentStep(3);
  };

  // reservation form submit
  const onMenuItemAdd = (id: string) => {
    // check given ide is available in menu data
    let menuItem = selectedMenu?.menu.find((menu) => menu.id === id);
    // copy of selected menu
    let selectedMenuCopy = selectedMenu?.menu || [];
    // if menu item is available
    if (menuItem) {
      menuItem = {
        ...menuItem,
        quantity: menuItem.quantity + 1,
      };
      // index of menu item
      let index = selectedMenu?.menu.findIndex((menu) => menu.id === id) || 0;
      selectedMenuCopy[index] = menuItem;
    } else {
      menuItem = {
        id,
        quantity: 1,
      };
      selectedMenuCopy.push(menuItem);
    }

    // add menuItem to selected menu
    setSelectedMenu({
      menu: selectedMenuCopy,
    });
  };

  // menu item decrease and remove
  const onMenuItemRemove = (id: string) => {
    // check given id is available in menu data
    let menuItem = selectedMenu?.menu.find((menu) => menu.id === id);
    // copy of selected menu
    let selectedMenuCopy = selectedMenu?.menu || [];
    // if menu item is available
    if (menuItem && menuItem.quantity > 1) {
      menuItem = {
        ...menuItem,
        quantity: menuItem.quantity - 1,
      };
      // index of menu item
      let index = selectedMenu?.menu.findIndex((menu) => menu.id === id) || 0;
      selectedMenuCopy[index] = menuItem;
      // add menuItem to selected menu
      setSelectedMenu({
        menu: selectedMenuCopy,
      });
    } else if (menuItem && menuItem.quantity === 1) {
      setSelectedMenu({
        menu: selectedMenu?.menu.filter((menu) => menu.id !== id) || [],
      });
    }
  };

  return (
    <div
      className="mx-5 flex flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
      id="TableReserveForm"
    >
      {/* stepper */}
      <div className="mb-10 flex items-center justify-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          1
        </div>
        <div
          className={`h-0.5 w-6 sm:w-16 ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"}`}
        ></div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"} text-white`}
        >
          2
        </div>
        <div
          className={`h-0.5 w-6 sm:w-16 ${currentStep >= 3 ? "bg-primary" : "bg-gray-300"}`}
        ></div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3 ? "bg-primary" : "bg-gray-300"} text-white`}
        >
          3
        </div>
        <div
          className={`h-0.5 w-6 sm:w-16 ${currentStep >= 4 ? "bg-primary" : "bg-gray-300"}`}
        ></div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 4 ? "bg-primary" : "bg-gray-300"} text-white`}
        >
          4
        </div>
      </div>

      {currentStep <= 2 && (
        <h2 className="text-xl font-medium text-gray-800 md:text-2xl lg:text-3xl">
          Savor Every Bite: Reserve{" "}
          <span className="text-primary">Your Table</span>
        </h2>
      )}

      {/* step 1 */}
      {/* check availability form */}
      {currentStep === 1 && (
        <AvailabilityForm
          availabilityForm={availabilityForm}
          errors={errors}
          isLoading={isLoading}
          onAvailabilityFormSubmit={onAvailabilityFormSubmit}
        />
      )}

      {/* step 2 */}
      {/* booking form */}
      {currentStep === 2 && (
        <RestaurantReservationForm
          reservationForm={reservationForm}
          errors={errors}
          isLoading={isLoading}
          onReservationFormSubmit={onReservationFormSubmit}
          setCurrentStep={setCurrentStep}
        />
      )}

      {/* step 3 */}
      {/* foods */}
      {currentStep === 3 && (
        <h2 className="my-10 text-xl font-medium text-gray-800 md:text-2xl lg:text-3xl">
          Savor Every Bite: Choose{" "}
          <span className="text-primary">Your Menu</span>
        </h2>
      )}
      {currentStep === 3 && (
        <FoodsSelections
          onMenuItemAdd={onMenuItemAdd}
          onMenuItemRemove={onMenuItemRemove}
          selectedMenu={selectedMenu}
          errors={errors}
          setCurrentStep={setCurrentStep}
        />
      )}
      {/* order summary */}
      {currentStep === 4 && (
        <OrderSummary
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  );
};
