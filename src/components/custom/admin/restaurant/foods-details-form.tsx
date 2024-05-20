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
  Textarea,
  type FileState,
} from "@/components";
import { errorTypes } from "@/types";
import { FoodFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { transferZodErrors } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { setAllFoods, setCurrentFood } from "@/states/admin";
import { addOrUpdateFood, deleteFoodsImages } from "@/actions/admin/foods-crud";
import { useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";

// default value for errors
const errorDefault: errorTypes = {
  foodType: [],
  foodId: [],
  name: [],
  price: [],
  description: [],
  images: [],
};

// food types
const foodTypes = [
  "Fride_Rice",
  "Kottu",
  "Soup",
  "Appetizer",
  "Nasi_Goraeng",
  "Pasta",
  "Desert",
  "Cheese_Kottu",
  "Submarine",
  "Hot",
  "Mojito",
  "Milk_Shake",
  "Fresh_Fruit_juice",
  "Soft_Drink",
];

export const AdminFoodsDetailsForm: FC<{ isPending: boolean }> = ({
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
  const foods = useSelector((state: AdminState) => state.foods_admin);
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
  const form = useForm<z.infer<typeof FoodFormSchema>>({
    resolver: zodResolver(FoodFormSchema),
    defaultValues: {
      foodType: "Fride_Rice",
      foodId: "",
      name: "Chicken Fride Rice",
      price: 0,
      description: "",
      images: [],
    },
  });

  const deleteImages = async (image: string) => {
    const images =
      foods.current?.images.data.filter((img) => img !== image) || [];
    const foodId = foods.current?.id || "";
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
    setIsLoading(true);

    await deleteFoodsImages(foodId, images, pageNumber)
      .then(async (res) => {
        dispatch(setCurrentFood(res.food));
        dispatch(setAllFoods(res.foods));

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
  const onSubmit = async (data: z.infer<typeof FoodFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);
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
          await addOrUpdateFood(data, foods.current?.id ? true : false).then(
            (res) => {
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
                  title: `Food ${data.foodId ? "added" : "updated"} successfully!`,
                  description: new Date().toLocaleTimeString(),
                  className:
                    "bg-green-500 border-primary rounded-md text-white",
                });
                dispatch(setAllFoods(res.data));
              }
            },
          );
        });
      })
      .catch((err) => {
        toast({
          title: `Failed to ${data.foodId ? "add" : "update"} food!`,
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
    if (foods.current?.foodId) {
      form.setValue("foodId", foods.current.foodId);
      form.setValue("name", foods.current.name);
      form.setValue("foodType", foods.current.foodType);
      form.setValue("price", foods.current.price);
      form.setValue("description", foods.current.description);
      form.setValue("images", foods.current.images.data);
    } else {
      form.reset();
    }
  }, [form, foods]);

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
              {!foods.current?.foodId ? "Add new" : "Edit"} Food
            </CardTitle>
            <CardDescription>
              {!foods.current?.foodId ? "Add new" : "Edit"} food details to The
              Villa Restaurant
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
                {/* food id field */}
                <FormField
                  control={form.control}
                  name="foodId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Food ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          disabled={foods.current?.foodId ? true : false}
                          {...field}
                          value={foods.current?.foodId || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.number && errors?.number[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* food type */}
                <FormField
                  control={form.control}
                  name="foodType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <BsBuildingsFill /> Food Type
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
                          {foodTypes.map((foodType) => (
                            <SelectItem
                              key={foodType}
                              value={foodType}
                              className="capitalize"
                            >
                              {foodType.replaceAll("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* food name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Food Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          {...field}
                          defaultValue={foods.current?.foodId || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.number && errors?.number[0]}
                      </FormMessage>
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

                {/* description */}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex w-full items-start justify-between">
                        <div className="flex items-center gap-1">
                          <TbHexagonNumber1Filled /> Description
                        </div>
                        <span className="text-xs">
                          {field.value?.length}/500
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className=""
                          rows={5}
                          maxLength={500}
                          placeholder="Enter food description"
                          {...field}
                          defaultValue={foods.current?.foodId || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.number && errors?.number[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* image */}
                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Upload Food Images
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
                                            input: { type: "food" },
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
                {foods.current?.images &&
                  foods.current?.images.data.length > 0 && (
                    <>
                      <div className="">
                        {foods.current?.images && (
                          <FormLabel className="pt-10 text-[0.9rem] text-base">
                            Current Images
                          </FormLabel>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 ">
                        {foods.current?.images.data.map((image, index) => (
                          <div
                            className="relative flex flex-col"
                            key={Date.now() + "-" + index}
                          >
                            <Image
                              width={200}
                              height={200}
                              src={image + `?${Date.now()}_${index} `}
                              className="h-32 w-32 rounded-md bg-gray-300 object-cover"
                              alt="food image"
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
            {!foods.current?.foodId ? "Add" : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
