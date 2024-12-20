"use client";

import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import {
  Button,
  ContentWrapper,
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
import { RestaurantMenuSchema } from "@/validations";
import { errorTypes, minimalFoodData } from "@/types";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { getAllAvailableFoods } from "@/actions/food-reservations";
import { ClipLoader } from "react-magic-spinners";

type MenuItem = {
  type: string;
  items: minimalFoodData[];
};

export const FoodsSelections: FC<{
  menuSelectionForm: UseFormReturn<z.infer<typeof RestaurantMenuSchema>>;
  onMenuSelectionFormSubmit: SubmitHandler<
    z.infer<typeof RestaurantMenuSchema>
  >;
  onMenuItemAdd: (id: string) => void;
  onMenuItemRemove: (id: string) => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  errors: errorTypes;
  isLoading: boolean;
}> = ({
  menuSelectionForm,
  onMenuSelectionFormSubmit,
  onMenuItemAdd,
  onMenuItemRemove,
  setCurrentStep,
  errors,
  isLoading,
}) => {
  // State to store the menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Function to fetch menu items
  const fetchMenu = async () => {
    await getAllAvailableFoods()
      .then((response) => {
        if (response) {
          setMenuItems(response);
        }
      })
      .catch(() => {
        setMenuItems([]);
      });
  };

  // Fetch menu items when the component mounts
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="flex w-full max-w-5xl flex-col items-center">
      <div className="flex w-full flex-col justify-center">
        {menuItems.map((menu) => {
          return (
            <ContentWrapper
              key={menu.type}
              className="w-full"
              topic={menu.type.replaceAll("_", " ")}
            >
              <div
                key={menu.type}
                className="flex w-full flex-wrap justify-center gap-4"
              >
                {menu.items.map((item) => (
                  <div
                    key={item.foodId}
                    className="flex w-72 flex-col items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-3 shadow-lg drop-shadow-lg"
                  >
                    <div className="w-full">
                      <Image
                        src={item.images?.data[0]}
                        alt={item.name}
                        width={500}
                        height={500}
                        className="h-40 w-full rounded-t-lg object-cover"
                      />
                      <div className="flex flex-col items-start justify-center gap-2">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm font-normal text-gray-600">
                          {item.description}
                        </p>
                        <p className="text-sm font-normal text-gray-600">
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Increase and decrease button */}
                    <div className="mt-5 flex w-full justify-end">
                      <div className="flex">
                        {/* Remove button */}
                        <Button
                          disabled={
                            menuSelectionForm
                              .watch("menu")
                              ?.find((m) => m.id === item.foodId) === undefined
                          }
                          className="h-8 w-8 rounded-e-none rounded-s-lg border-none bg-primary text-xl !text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                          onClick={() => onMenuItemRemove(item.foodId)}
                          variant="outline"
                        >
                          -
                        </Button>
                        {/* Quantity */}
                        <p className="flex h-8 w-8 items-center justify-center bg-gray-200 font-medium">
                          {menuSelectionForm
                            .watch("menu")
                            ?.find((m) => m.id === item.foodId)?.quantity || 0}
                        </p>

                        {/* Add button */}
                        <Button
                          disabled={
                            menuSelectionForm
                              .watch("menu")
                              .find((m) => m.id === item.foodId)?.quantity ===
                              5 || false
                          }
                          className="h-8 w-8 rounded-e-lg rounded-s-none border-none bg-primary text-xl !text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                          onClick={() => onMenuItemAdd(item.foodId)}
                          variant="outline"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ContentWrapper>
          );
        })}
      </div>

      <Form {...menuSelectionForm}>
        <form className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-5">
          <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:items-start">
            <FormField
              control={menuSelectionForm.control}
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
          </div>
        </form>
      </Form>

      <div className="mt-10 flex w-full max-w-2xl justify-between">
        {/* back button */}
        <Button
          onClick={() => setCurrentStep(2)}
          className="flex h-10 w-full max-w-48 items-center justify-center gap-x-2 border border-primary bg-transparent text-primary hover:text-white"
        >
          Previous
        </Button>

        <Button
          onClick={menuSelectionForm.handleSubmit(onMenuSelectionFormSubmit)}
          className="flex h-10 w-full max-w-48 items-center justify-center gap-x-2"
        >
          {isLoading && <ClipLoader size={20} color="#fff" />}
          Next
        </Button>
      </div>
    </div>
  );
};
