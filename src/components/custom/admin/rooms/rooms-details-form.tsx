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
  DeleteAlert,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultiFileDropzone,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  type FileState,
} from "@/components";
import { errorTypes } from "@/types";
import { RoomFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsBuildingsFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { ClipLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import { addOrUpdateRoom, deleteRoomsImages } from "@/actions/admin/rooms-crud";
import { transferZodErrors } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { setAllRooms, setCurrentRoom } from "@/states/admin";
import { useSearchParams } from "next/navigation";
import { bedsTypeArray, featuresArray, roomTypeArray } from "@/constants";

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

export const AdminRoomsDetailsForm: FC<{ isPending: boolean }> = ({
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

  // file state update handler
  const updateFileProgress = (key: string, progress: FileState["progress"]) => {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  };

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

  const deleteImages = async (image: string) => {
    const images =
      rooms.current?.images.data.filter((img) => img !== image) || [];
    const roomId = rooms.current?.id || "";
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
    setIsLoading(true);

    await deleteRoomsImages(roomId, images, pageNumber)
      .then(async (res) => {
        dispatch(setCurrentRoom(res.room));
        dispatch(setAllRooms(res.rooms));

        await edgestore.publicFiles.delete({
          url: image,
        });
      })
      .then(() => {
        toast({
          title: "Image deleted successfully!",
          description: new Date().toLocaleTimeString(),
          className: "bg-green-500 border-primary rounded-md text-white",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to delete image!",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 border-red-600 rounded-md text-white",
        });
      })
      .finally(() => setIsLoading(false));
  };

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
              {!rooms.current?.number ? "Add new" : "Edit"} Room
            </CardTitle>
            <CardDescription>
              {!rooms.current?.number ? "Add new" : "Edit"} room details to The
              Villa
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-3 py-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative w-full space-y-5 overflow-hidden"
            >
              <div className="space-y-5 overflow-auto p-2 lg:max-h-[calc(100vh_-_23rem)]">
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
                          disabled={rooms.current?.number ? true : false}
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
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomTypeArray.map((roomType) => (
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

                {/* features */}
                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Features</FormLabel>
                        <FormDescription>
                          Select the items you want to display in the features
                          sections.
                        </FormDescription>
                      </div>
                      {featuresArray.map((item, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name="features"
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
                        {errors?.features && errors?.features[0]}
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
                      {bedsTypeArray.map((item, index) => (
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
                                  {item.replaceAll("_", " ")}
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

                {/* files */}
                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Upload Room Images
                        </FormLabel>
                        <FormDescription className="">
                          You can upload multiple images at once. (Max size: 1MB
                          per image)
                        </FormDescription>
                      </div>
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => {
                          return (
                            <div className="w-full">
                              <MultiFileDropzone
                                value={fileStates}
                                onChange={(files) => {
                                  setFileStates(files);
                                }}
                                dropzoneOptions={{
                                  maxSize: 1024 * 1024 * 1,
                                  accept: {
                                    "image/*": [
                                      ".jpeg",
                                      ".jpg",
                                      ".png",
                                      ".webp",
                                    ],
                                  },
                                }}
                                onFilesAdded={async (addedFiles) => {
                                  setFileStates([...fileStates, ...addedFiles]);
                                  await Promise.all(
                                    addedFiles.map(async (addedFileState) => {
                                      try {
                                        const res =
                                          await edgestore.publicFiles.upload({
                                            file: addedFileState.file,
                                            options: {
                                              temporary: true,
                                            },
                                            input: { type: "room" },
                                            onProgressChange: async (
                                              progress,
                                            ) => {
                                              updateFileProgress(
                                                addedFileState.key,
                                                progress,
                                              );
                                              if (progress === 100) {
                                                // wait 1 second to set it to complete
                                                // so that the user can see the progress bar at 100%
                                                await new Promise((resolve) =>
                                                  setTimeout(resolve, 1000),
                                                );
                                                updateFileProgress(
                                                  addedFileState.key,
                                                  "COMPLETE",
                                                );
                                              }
                                            },
                                          });
                                        form.setValue("images", [
                                          ...form.getValues().images,
                                          res.url,
                                        ]);
                                      } catch (err) {
                                        updateFileProgress(
                                          addedFileState.key,
                                          "ERROR",
                                        );
                                      }
                                    }),
                                  );
                                }}
                              />

                              <FormMessage>
                                {errors?.images && errors?.images[0]}
                              </FormMessage>
                            </div>
                          );
                        }}
                      />
                    </FormItem>
                  )}
                />

                {/* show uploaded images */}
                {rooms.current?.images &&
                  rooms.current?.images.data.length > 0 && (
                    <>
                      <div className="">
                        {rooms.current?.images && (
                          <FormLabel className="pt-10 text-[0.9rem] text-base">
                            Current Images
                          </FormLabel>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 ">
                        {rooms.current?.images.data.map((image, index) => (
                          <div
                            className="relative flex flex-col"
                            key={Date.now() + "-" + index}
                          >
                            <Image
                              width={200}
                              height={200}
                              src={image + `?${Date.now()}_${index} `}
                              className="h-32 w-32 rounded-md bg-gray-300 object-cover"
                              alt="room image"
                            />

                            <DeleteAlert yesAction={() => deleteImages(image)}>
                              <div className="absolute right-1 top-1 z-50 flex h-8 w-8 items-center justify-center rounded-lg border border-red-400 bg-transparent p-0 text-red-500 hover:bg-slate-900/10 hover:text-red-600">
                                <MdDelete className="h-5 w-5 text-2xl" />
                              </div>
                            </DeleteAlert>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
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
