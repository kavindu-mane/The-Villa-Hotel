"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
  MultiFileDropzone,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type FileState,
} from "@/components";
import { errorTypes, roomsDataTypes } from "@/types";
import { RoomFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FC, startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsBuildingsFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { ClipLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import { addRoom } from "@/actions/admin/rooms-crud";
import { transferZodErrors } from "@/utils";

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

//features
const features = [
  "Air Conditioning",
  "Shower",
  "En-suite Bathroom",
  "Sea View",
  "Balcony",
  "Garden View",
  "Private Entrance",
  "Tea/Coffee Maker",
  "Free Wi-Fi",
];

// beds options
const bedsOptions = ["2 Single Bed", "One Large Double Bed"];

export const AdminRoomsDetailsForm: FC<{
  data: roomsDataTypes | undefined;
  setIsRefresh: (value: boolean) => void;
}> = ({ data, setIsRefresh }) => {
  const params = useSearchParams();
  const roomId = params.get("id") || "new";
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

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
      images: ["rgerg", "egerger"],
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof RoomFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);
    // submit images to edge store
    // await Promise.all(
    //   data.images.map(async (image) => {
    //     const res = await edgestore.publicFiles.confirmUpload({
    //       url: image,
    //     });
    //     return res;
    //   }),
    // )
    //   .then(() => {
    startTransition(() => {
      addRoom(data)
        .then((res) => {
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
              title: `Room ${roomId === "new" ? "added" : "updated"} successfully!`,
              description: new Date().toLocaleTimeString(),
              className: "bg-green-500 border-primary rounded-md text-white",
            });
            setIsRefresh(true);
          }
        })
        // })
        // })
        .catch((err) => {
          toast({
            title: `Failed to ${roomId === "new" ? "add" : "update"} room!`,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-red-600 rounded-md text-white",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  // update if data have values
  useEffect(() => {
    if (data?.number) {
      form.setValue("number", data.number);
      form.setValue("room_type", data.type);
      form.setValue("persons", data.persons);
      form.setValue("price", data.price);
      form.setValue("features", data.features.data);
      form.setValue("beds", data.beds.data);
      form.setValue("images", data.images.data);
    }
  }, [data, form]);

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
                      <Input className="h-10" type="number" {...field} />
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
                    {features.map((item, index) => (
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
                      <FormLabel className="text-base">Beds Options</FormLabel>
                      <FormDescription>
                        Select the items you want to display in the beds options
                        section.
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
                    <FormMessage>{errors?.beds && errors?.beds[0]}</FormMessage>
                  </FormItem>
                )}
              />

              {/* images  */}
              <div className="">
                <FormLabel className="pt-5 text-[0.9rem]">
                  Upload Room Images
                </FormLabel>
                <FormDescription className="">
                  You can upload multiple images at once. (Max size: 1MB per
                  image)
                </FormDescription>
              </div>

              {/* files */}
              <div className="w-full">
                <MultiFileDropzone
                  value={fileStates}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  dropzoneOptions={{
                    maxSize: 1024 * 1024 * 1,
                    accept: {
                      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                    },
                  }}
                  onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    await Promise.all(
                      addedFiles.map(async (addedFileState) => {
                        try {
                          const res = await edgestore.publicFiles.upload({
                            file: addedFileState.file,
                            options: {
                              temporary: true,
                            },
                            input: { type: "room" },
                            onProgressChange: async (progress) => {
                              updateFileProgress(addedFileState.key, progress);
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
                          updateFileProgress(addedFileState.key, "ERROR");
                        }
                      }),
                    );
                  }}
                />
                <FormMessage>{errors?.beds && errors?.beds[0]}</FormMessage>
              </div>

              {/* show uploaded images */}
              {/* <div className="flex flex-wrap justify-center gap-2 ">
                {data?.images.data.map((image, index) => (
                  <Image
                    key={index}
                    width={200}
                    height={200}
                    src={image || "/images/img_1.jpg"}
                    alt="room"
                    className="h-32 w-32 rounded-md object-cover"
                  />
                ))}
              </div> */}

              {/* submit */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="flex h-10 w-full max-w-sm items-center justify-center gap-x-2 lg:max-w-xs"
                >
                  {isLoading && <ClipLoader size={20} color="#fff" />}
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
