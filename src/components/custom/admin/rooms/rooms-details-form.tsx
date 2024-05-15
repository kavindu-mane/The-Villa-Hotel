"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { errorTypes } from "@/types";
import { RoomFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BsBuildingsFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";

// default value for errors
const errorDefault: errorTypes = {
  number: [],
  room_type: [],
  beds: [],
  features: [],
  persons: [],
  price: [],
  images: [],
  message: "",
};

// room types
const roomTypes = ["Standard", "Deluxe", "Superior"];

export const AdminRoomsDetailsForm: FC = () => {
  const params = useSearchParams();
  const roomId = params.get("id") || "1";
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  // form hook
  const form = useForm<z.infer<typeof RoomFormSchema>>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: {
      number: 1,
      room_type: "Standard",
      beds: [],
      features: [],
      persons: 2,
      price: 0,
      images: [],
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof RoomFormSchema>) => {};

  return (
    <div>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {roomId === "new" ? "Add new" : "Edit"} Room
            </CardTitle>
            <CardDescription>
              {roomId === "new" ? "Add new" : "Edit"} room details to The Villa
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* room number field */}
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <TbHexagonNumber1Filled /> Room Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors?.number && errors?.number[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* room type */}
              <FormField
                control={form.control}
                name="room_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex items-center gap-2">
                      <BsBuildingsFill /> Room Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomTypes.map((roomType) => (
                          <SelectItem
                            key={roomType}
                            value={roomType}
                            className="capitalize"
                          >
                            {roomType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* persons */}
              <FormField
                control={form.control}
                name="persons"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex items-center gap-2">
                      <IoPerson /> Persons
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* price usd */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaDollarSign /> Price (USD)
                    </FormLabel>
                    <FormControl>
                      <Input className="h-10" type="number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors?.price && errors?.price[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* submit */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="h-10 w-full max-w-sm lg:max-w-xs"
                >
                  {roomId === "new" ? "Add" : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
