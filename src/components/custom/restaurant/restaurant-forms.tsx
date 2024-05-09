"use client";

import {
  AvailabilityForm,
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components";
import { cn } from "@/lib/utils";
import { oneMonthFromNow, tomorrow } from "@/utils";
import {
  RestaurantAvailabilitySchema,
  RestaurantMenuSchema,
  RestaurantReservationSchema,
} from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ClipLoader } from "react-magic-spinners";
import { errorTypes } from "@/types";
import Image from "next/image";

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
      remark: "",
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
        <Form {...reservationForm}>
          <form
            onSubmit={reservationForm.handleSubmit(onReservationFormSubmit)}
            className="flex w-full max-w-2xl flex-col items-center justify-center gap-5"
          >
            {/* name field */}
            <FormField
              control={reservationForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 bg-white"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors?.name && errors?.name[0]}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
              {/* phone field */}
              <FormField
                control={reservationForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 bg-white"
                        placeholder="+94xxxxxxxxx"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors?.phone && errors?.phone[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* email field */}
              <FormField
                control={reservationForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 bg-white"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors?.email && errors?.email[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* remark */}
            <FormField
              control={reservationForm.control}
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

            <FormField
              control={reservationForm.control}
              name="table"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Table</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-wrap justify-center gap-3"
                    >
                      {Array.from({ length: 20 }, (_, i) => (
                        <FormItem key={i} className="flex items-center">
                          <FormLabel className="w-28 cursor-pointer rounded-lg bg-slate-600 py-3 text-center font-normal text-white disabled:bg-gray-300 has-[:checked]:bg-primary">
                            <FormControl>
                              <RadioGroupItem
                                value={(i + 1).toString()}
                                className="peer sr-only"
                              />
                            </FormControl>
                            Table {(i + 1).toString().padStart(2, "0")}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-between">
              {/* back button */}
              <Button
                onClick={() => setCurrentStep(1)}
                className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2 border border-primary bg-transparent text-primary hover:text-white"
              >
                Previous
              </Button>
              {/* submit button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="flex h-10 w-full max-w-40 items-center justify-center gap-x-2"
              >
                {isLoading && <ClipLoader size={20} color="#fff" />} Reserve
                Table
              </Button>
            </div>
          </form>
        </Form>
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
              Previous
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
