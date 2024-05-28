"use client";

import { Dispatch, FC, SetStateAction } from "react";
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

// menu data
const menuData = [
  {
    id: "1",
    name: "Greek Yoghurt with Strawberries",
    image: "/images/img_25.jpg",
    description:
      "Savor the perfect blend of creamy and fruity with our Strawberry Greek Yogurt. Indulge in velvety Greek yogurt topped with luscious, ripe strawberries for a delightful burst of flavor in every spoonful.",
  },
  {
    id: "2",
    name: "Strawberry Pancakes",
    image: "/images/img_26.jpg",
    description:
      "Indulge in a stack of fluffy pancakes topped with fresh strawberries and whipped cream. Our Strawberry Pancakes are the perfect way to start your day.",
  },
  {
    id: "3",
    name: "Strawberry French Toast",
    image: "/images/img_27.jpg",
    description:
      "Treat yourself to a delicious breakfast with our Strawberry French Toast. Made with thick slices of bread soaked in a sweet egg mixture and topped with fresh strawberries, this dish is sure to satisfy your sweet tooth.",
  },
  {
    id: "4",
    name: "Strawberry Waffles",
    image: "/images/img_25.jpg",
    description:
      "Enjoy a classic breakfast with a twist with our Strawberry Waffles. Crisp on the outside and fluffy on the inside, our waffles are topped with fresh strawberries and whipped cream for a deliciously sweet treat.",
  },
  {
    id: "5",
    name: "Strawberry Smoothie",
    image: "/images/img_26.jpg",
    description:
      "Cool off with a refreshing Strawberry Smoothie. Made with fresh strawberries, yogurt, and a touch of honey, this smoothie is the perfect way to start your day or enjoy as a midday snack.",
  },
  {
    id: "6",
    name: "Strawberry Salad",
    image: "/images/img_27.jpg",
    description:
      "Enjoy a light and refreshing meal with our Strawberry Salad. Made with fresh strawberries, mixed greens, feta cheese, and a balsamic vinaigrette, this salad is the perfect balance of sweet and savory.",
  },
  {
    id: "7",
    name: "Strawberry Chicken",
    image: "/images/img_25.jpg",
    description:
      "Indulge in a flavorful and satisfying meal with our Strawberry Chicken. Tender chicken breasts are smothered in a sweet and tangy strawberry sauce for a dish that is sure to impress.",
  },
  {
    id: "8",
    name: "Strawberry Pizza",
    image: "/images/img_26.jpg",
    description:
      "Satisfy your pizza cravings with our Strawberry Pizza. Topped with fresh strawberries, mozzarella cheese, and a balsamic glaze, this pizza is a delicious twist on a classic favorite.",
  },
];

export const FoodsSelections: FC<{
  selectedMenu: z.infer<typeof RestaurantMenuSchema> | null;
  onMenuItemAdd: (id: string) => void;
  onMenuItemRemove: (id: string) => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  errors: errorTypes;
}> = ({
  selectedMenu,
  onMenuItemAdd,
  onMenuItemRemove,
  setCurrentStep,
  errors,
}) => {
  // form hooks
  const remarkForm = useForm<z.infer<typeof RestaurantRemarkSchema>>({
    resolver: zodResolver(RestaurantRemarkSchema),
    defaultValues: {
      remark: "",
    },
  });
  return (
    <div className="">
      <div className="flex flex-wrap justify-center gap-3">
        {menuData.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex w-80 flex-col items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-3 shadow-lg drop-shadow-lg"
            >
              <div className="">
                <Image
                  src={menu.image}
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
                </div>
              </div>

              {/* increase and decrease button */}
              <div className="mt-5 flex w-full justify-end">
                <div className="flex">
                  {/*  add button */}
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
                  {/* quantity */}
                  <p className="flex h-8 w-8 items-center justify-center bg-gray-200 font-medium">
                    {selectedMenu?.menu.find((m) => m.id === menu.id)
                      ?.quantity || 0}
                  </p>
                  {/* remove button */}
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
          );
        })}
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
          onClick={() => setCurrentStep(4)}
          className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
