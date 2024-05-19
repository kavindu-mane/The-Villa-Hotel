"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Skeleton,
  type FileState,
} from "@/components";
import { errorTypes } from "@/types";
import { RoomFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import { ClipLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import { addOrUpdateRoom } from "@/actions/admin/rooms-crud";
import { transferZodErrors } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { setAllRooms } from "@/states/admin";
import { useSearchParams } from "next/navigation";

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

// beds options
const bedsOptions = ["2 Single Bed", "One Large Double Bed"];

export const AdminRoomsReservationDetailsForm: FC<{ isPending: boolean }> = ({
  isPending,
}) => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  // dispatcher
  const dispatch = useDispatch();
  const rooms = useSelector((state: AdminState) => state.rooms_admin);
  const params = useSearchParams();
  const page = params.get("page") || "1";

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
  const onSubmit = async (data: z.infer<typeof RoomFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);

    // submit images to edge store
    await Promise.all(
      data.images.map(async (image) => {
        const res = await edgestore.publicFiles.confirmUpload({
          url: image,
        });
        return res;
      }),
    )
      .then(() => {
        startTransition(async () => {
          await addOrUpdateRoom(
            data,
            rooms.current?.number ? true : false,
            rooms.current?.id ? pageNumber : Infinity,
          ).then((res) => {
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
            if (res.success) {
              toast({
                title: `Room ${data.number ? "added" : "updated"} successfully!`,
                description: new Date().toLocaleTimeString(),
                className: "bg-green-500 border-primary rounded-md text-white",
              });
              dispatch(setAllRooms(res.data));
            }
          });
        });
      })
      .catch((err) => {
        toast({
          title: `Failed to ${data.number ? "add" : "update"} room!`,
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => {
        setFileStates([]);
        setIsLoading(false);
      });
  };

  // update if data have values
  useEffect(() => {
    if (rooms.current?.number) {
      form.setValue("number", rooms.current.number);
      form.setValue("room_type", rooms.current.type);
      form.setValue("persons", rooms.current.persons);
      form.setValue("price", rooms.current.price);
      form.setValue("features", rooms.current.features.data);
      form.setValue("beds", rooms.current.beds.data);
      form.setValue("images", rooms.current.images.data);
    } else {
      form.reset();
    }
  }, [form, rooms]);

  if (isPending)
    return (
      <div>
        <Card className="flex flex-col gap-3 p-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-20 w-full" />
        </Card>
      </div>
    );

  return (
    <div>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {!rooms.current?.number ? "Add new" : "Edit"} Room Reservation
            </CardTitle>
            <CardDescription>
              {!rooms.current?.number ? "Add new" : "Edit"} reservation details to The
              Villa
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative w-full space-y-5 overflow-hidden"
            >
              <div className="space-y-5 overflow-auto lg:max-h-[calc(100vh_-_23rem)]">
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
                          value={rooms.current?.number || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.number && errors?.number[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* beds options */}
                <FormField
                  control={form.control}
                  name="beds"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Beds Options
                        </FormLabel>
                        <FormDescription>
                          Select the items you want to display in the beds
                          options section.
                        </FormDescription>
                      </div>
                      {bedsOptions.map((item, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name="beds"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage>
                        {errors?.beds && errors?.beds[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex w-full justify-center bg-gray-100 py-5">
          {/* submit */}
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={
              isLoading ||
              fileStates.some((fileState) => fileState.progress !== "COMPLETE")
            }
            className="flex h-10 w-full max-w-sm items-center justify-center gap-x-2 lg:max-w-xs"
          >
            {isLoading && <ClipLoader size={20} color="#fff" />}
            {!rooms.current?.number ? "Add" : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
