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
import { TableFormSchema } from "@/validations";
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
import { setAllTables, setCurrentTable } from "@/states/admin";
import {
  addOrUpdateTable,
  deleteTablesImages,
} from "@/actions/admin/tables-crud";
import { useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { tableArray } from "@/constants";

// default value for errors
const errorDefault: errorTypes = {
  tableType: [],
  tableId: [],
  price: [],
  description: [],
  images: [],
};

export const AdminTablesDetailsForm: FC<{ isPending: boolean }> = ({
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
  const tables = useSelector((state: AdminState) => state.tables_admin);
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
  const form = useForm<z.infer<typeof TableFormSchema>>({
    resolver: zodResolver(TableFormSchema),
    defaultValues: {
      tableType: "Four_Seat",
      tableId: "",

      price: 0,
      description: "",
      images: [],
    },
  });

  const deleteImages = async (image: string) => {
    const images =
     tables.current?.images.data.filter((img) => img !== image) || [];
    const tableId = tables.current?.id || "";
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
    setIsLoading(true);

    await deleteTablesImages(tableId, images, pageNumber)
      .then(async (res) => {
        dispatch(setCurrentTable(res.table));
        dispatch(setAllTables(res.tables));

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
  const onSubmit = async (data: z.infer<typeof TableFormSchema>) => {
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
          await addOrUpdateTable(data, tables.current?.id ? true : false).then(
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
                  title: `Food ${data.tableId ? "added" : "updated"} successfully!`,
                  description: new Date().toLocaleTimeString(),
                  className:
                    "bg-green-500 border-primary rounded-md text-white",
                });
                dispatch(setAllTables(res.data));
              }
            },
          );
        });
      })
      .catch((err) => {
        toast({
          title: `Failed to ${data.tableId ? "add" : "update"} table!`,
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
    if (tables.current?.tableId) {
      form.setValue("tableId", tables.current.tableId);
      form.setValue("tableType", tables.current.tableType);
      form.setValue("price", tables.current.price);
      form.setValue("description", tables.current.description);
      form.setValue("images", tables.current.images.data);
    } else {
      form.reset();
    }
  }, [form, tables]);

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
              {!tables.current?.tableId ? "Add new" : "Edit"} Table
            </CardTitle>
            <CardDescription>
              {!tables.current?.tableId ? "Add new" : "Edit"} table details to The
              Villa Restaurant
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
                {/* table id field */}
                <FormField
                  control={form.control}
                  name="tableId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Table ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="R-10"
                          disabled={tables.current?.tableId ? true : false}
                          {...field}
                          value={tables.current?.tableId || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.number && errors?.number[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* table type */}
                <FormField
                  control={form.control}
                  name="tableType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <BsBuildingsFill /> Table Type
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
                          {tableArray.map((tableType) => (
                            <SelectItem
                              key={tableType}
                              value={tableType}
                              className="capitalize"
                            >
                              {tableType.replaceAll("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* table name field */}
                {/* <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Table Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          {...field}
                          defaultValue={tables.current?.tableId || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.number && errors?.number[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                /> */}

                {/* table price usd */}
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
                          placeholder="Enter table description"
                          {...field}
                          defaultValue={tables.current?.tableId || field.value}
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
                          Upload Table Images
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
                                            input: { type: "table" },
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
                {tables.current?.images &&
                  tables.current?.images.data.length > 0 && (
                    <>
                      <div className="">
                        {tables.current?.images && (
                          <FormLabel className="pt-10 text-[0.9rem] text-base">
                            Current Images
                          </FormLabel>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 ">
                        {tables.current?.images.data.map((image, index) => (
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
            {!tables.current?.tableId ? "Add" : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
