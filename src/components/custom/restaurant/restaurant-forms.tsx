"use client";

import {
  AvailabilityForm,
  FoodsSelections,
  RestaurantReservationForm,
  OrderSummary,
} from "@/components";
import { tomorrow, transferZodErrors } from "@/utils";
import {
  RestaurantAvailabilitySchema,
  RestaurantMenuSchema,
  RestaurantReservationSchema,
} from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  errorTypes,
  minimalTableData,
  offerDataTypes,
  tableReservationOrderSummery,
} from "@/types";
import {
  completeTableReservation,
  createPendingTableReservation,
  getAllAvailableTables,
} from "@/actions/table-reservations";
import { useToast } from "@/components/ui/use-toast";
import { createPendingFoodReservation } from "@/actions/food-reservations";
import { Provider } from "react-redux";
import { sessionStore } from "@/states/stores";

// default value for errors
const errorDefault: errorTypes = {
  date: [],
  timeSlot: [],
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
  // available table data
  const [availableTableData, setAvailableTableData] = useState<
    minimalTableData[] | null
  >(null);
  const [orderSummary, setOrderSummary] =
    useState<tableReservationOrderSummery | null>(null);
  const [offers, setOffers] = useState<offerDataTypes[] | null>(null);
  const { toast } = useToast();

  // availability form hook for get availability data
  const availabilityForm = useForm<
    z.infer<typeof RestaurantAvailabilitySchema>
  >({
    resolver: zodResolver(RestaurantAvailabilitySchema),
    defaultValues: {
      date: tomorrow(),
      timeSlot: "Morning (9:00 AM - 12:00 PM)",
    },
  });

  // reservation form for hook for get user details
  const reservationForm = useForm<z.infer<typeof RestaurantReservationSchema>>({
    resolver: zodResolver(RestaurantReservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      table: undefined,
    },
  });

  // foods selection form hook for get selected menu
  const menuSelectionForm = useForm<z.infer<typeof RestaurantMenuSchema>>({
    resolver: zodResolver(RestaurantMenuSchema),
    defaultValues: {
      menu: [],
      remark: "",
    },
  });

  // availability form submit
  const onAvailabilityFormSubmit = async (
    data: z.infer<typeof RestaurantAvailabilitySchema>,
  ) => {
    setIsLoading(true);
    await getAllAvailableTables(data)
      .then((res) => {
        if (res.availableTables) {
          setAvailableTableData(res.availableTables as minimalTableData[]);
          setCurrentStep(2);
        }
        if (res.errors) {
          setErrors(transferZodErrors(res.errors).error);
        }
      })
      .catch(() => {
        toast({
          title: "Failed to get available tables",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // reservation form submit
  const onReservationFormSubmit = async (
    data: z.infer<typeof RestaurantReservationSchema>,
  ) => {
    setIsLoading(true);
    await createPendingTableReservation(availabilityForm.getValues(), data)
      .then((res) => {
        if (res.success) {
          setCurrentStep(3);
        }
        if (res.errors) {
          setErrors(transferZodErrors(res.errors).error);
        }
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Failed to create table reservation",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // food selection form submit
  const onMenuSelectionFormSubmit = async (
    data: z.infer<typeof RestaurantMenuSchema>,
  ) => {
    setIsLoading(true);
    await createPendingFoodReservation(data)
      .then((res) => {
        if (res.errors) {
          setErrors(transferZodErrors(res.errors).error);
        }
        if (res.data) {
          setOrderSummary(res.data as tableReservationOrderSummery);
        }
        if (res.offers) {
          setOffers(res.offers);
        }
        if (res.success) {
          setCurrentStep(4);
        }
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Failed to create food reservation",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // complete table reservation
  const onCompleteTableReservation = async (offerId?: string) => {
    setIsLoading(true);
    // create food reservation
    await completeTableReservation(offerId)
      .then((res) => {
        if (res.success) {
          toast({
            title: "Table reservation completed successfully",
            description: new Date().toLocaleTimeString(),
            className: "bg-green-500 border-green-600 rounded-md text-white",
          });
          // clear all statues and form data
          availabilityForm.reset();
          reservationForm.reset();
          menuSelectionForm.reset();
          setAvailableTableData(null);
          setOrderSummary(null);
          setOffers(null);
          setCurrentStep(1);
        }
        if (res.error) {
          toast({
            title: res.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Failed to create food reservation",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // reservation form submit
  const onMenuItemAdd = (id: string) => {
    const selectedMenu = menuSelectionForm.getValues("menu");
    // check given ide is available in menu data
    let menuItem = selectedMenu?.find((menu) => menu.id === id);
    // copy of selected menu
    let selectedMenuCopy = selectedMenu || [];
    // if menu item is available
    if (menuItem) {
      menuItem = {
        ...menuItem,
        quantity: menuItem.quantity + 1,
      };
      // index of menu item
      let index = selectedMenu?.findIndex((menu) => menu.id === id) || 0;
      selectedMenuCopy[index] = menuItem;
    } else {
      menuItem = {
        id,
        quantity: 1,
      };
      selectedMenuCopy.push(menuItem);
    }
    // add menuItem to selected menu
    menuSelectionForm.setValue("menu", selectedMenuCopy);
  };

  // menu item decrease and remove
  const onMenuItemRemove = (id: string) => {
    const selectedMenu = menuSelectionForm.getValues("menu");
    // check given id is available in menu data
    let menuItem = selectedMenu?.find((menu) => menu.id === id);
    // copy of selected menu
    let selectedMenuCopy = selectedMenu || [];
    // if menu item is available
    if (menuItem && menuItem.quantity > 1) {
      menuItem = {
        ...menuItem,
        quantity: menuItem.quantity - 1,
      };
      // index of menu item
      let index = selectedMenu?.findIndex((menu) => menu.id === id) || 0;
      selectedMenuCopy[index] = menuItem;
      // add menuItem to selected menu
      menuSelectionForm.setValue("menu", selectedMenuCopy);
    } else if (menuItem && menuItem.quantity === 1) {
      const filteredMenu = selectedMenu?.filter((menu) => menu.id !== id) || [];
      menuSelectionForm.setValue("menu", filteredMenu);
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
          onAvailabilityFormSubmit={onAvailabilityFormSubmit}
          errors={errors}
          isLoading={isLoading}
        />
      )}

      {/* step 2 */}
      {/* booking form */}
      {currentStep === 2 && (
        <Provider store={sessionStore}>
          <RestaurantReservationForm
            reservationForm={reservationForm}
            onReservationFormSubmit={onReservationFormSubmit}
            errors={errors}
            isLoading={isLoading}
            availableTableData={availableTableData}
            setCurrentStep={setCurrentStep}
          />
        </Provider>
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
          menuSelectionForm={menuSelectionForm}
          onMenuSelectionFormSubmit={onMenuSelectionFormSubmit}
          onMenuItemRemove={onMenuItemRemove}
          onMenuItemAdd={onMenuItemAdd}
          errors={errors}
          isLoading={isLoading}
          setCurrentStep={setCurrentStep}
        />
      )}
      {/* order summary */}
      {currentStep === 4 && (
        <OrderSummary
          setCurrentStep={setCurrentStep}
          orderSummary={orderSummary}
          onCompleteTableReservation={onCompleteTableReservation}
          offers={offers}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
