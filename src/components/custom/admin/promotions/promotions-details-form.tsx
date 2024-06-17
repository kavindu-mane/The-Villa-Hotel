"use client";

import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  Skeleton,
  Textarea,
} from "@/components";
import { errorTypes } from "@/types";
import { PromotionsFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { z } from "zod";
import { ClipLoader } from "react-magic-spinners";
import { useToast } from "@/components/ui/use-toast";
import { oneMonthFromNow, today, tomorrow, transferZodErrors } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "@/states/stores";
import { IoCalendarSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { VscSymbolKeyword } from "react-icons/vsc";
import { FaAudioDescription } from "react-icons/fa";
import { addOrUpdatePromotion } from "@/actions/admin/promotions-crud";
import { setAllPromotions } from "@/states/admin";

// default value for errors
const errorDefault: errorTypes = {
  code: [],
  description: [],
  discount: [],
  validFrom: [],
  validTo: [],
};

export const AdminPromotionsDetailsForm: FC<{ isPending: boolean }> = ({
  isPending,
}) => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  // dispatcher
  const dispatch = useDispatch();
  const promotion = useSelector((state: AdminState) => state.promotions_admin);

  // form hook
  const form = useForm<z.infer<typeof PromotionsFormSchema>>({
    resolver: zodResolver(PromotionsFormSchema),
    defaultValues: {
      code: "",
      description: "",
      discount: 0,
      validFrom: today(),
      validTo: oneMonthFromNow(),
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof PromotionsFormSchema>) => {
    setIsLoading(true);
    setErrors(errorDefault);

    startTransition(async () => {
      await addOrUpdatePromotion(
        data,
        promotion.current ? true : false,
      )
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
              title: `Promotion ${!promotion.current ? "added" : "updated"} successfully!`,
              description: new Date().toLocaleTimeString(),
              className: "bg-green-500 border-primary rounded-md text-white",
            });
            dispatch(setAllPromotions(res.data));
          }
        })
        .catch((err) => {
          toast({
            title: `Failed to ${!promotion.current ? "add" : "update"} promotion!`,
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
    if (promotion.current) {
      form.setValue("code", promotion.current.code);
      form.setValue("description", promotion.current.description);
      form.setValue("discount", promotion.current.discount);
      form.setValue("validFrom", new Date(promotion.current.validFrom));
      form.setValue("validTo", new Date(promotion.current.validTo));
    } else {
      form.reset();
    }
  }, [form, promotion]);

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
      <Card className="relative overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {!promotion.current ? "Add new" : "Edit"} Promotional offer
            </CardTitle>
            <CardDescription>
              {!promotion.current ? "Add new" : "Edit"} promotion details to The
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
                {/* code field field */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex items-center gap-2">
                        <VscSymbolKeyword /> Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 bg-white"
                          placeholder="Summer2024"
                          disabled={promotion.current ? true : false}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.code && errors?.code[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex w-full items-start justify-between">
                        <div className="flex items-center gap-x-2">
                          <FaAudioDescription />
                          Description
                        </div>
                        <span className="text-xs">
                          {field.value?.length}/100
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          maxLength={100}
                          className="bg-white"
                          placeholder="Special seasonal offer for summer 2024"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.description && errors?.description[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* discount */}
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TbHexagonNumber1Filled /> Discount (Percentage)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          type="number"
                          min={0}
                          max={100}
                          placeholder="10"
                          {...field}
                          value={promotion.current?.discount || field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.discount && errors?.discount[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* valid from */}
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="flex items-center gap-2">
                        <IoCalendarSharp /> Valid From
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "LLL dd, y")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            defaultMonth={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < today()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage>
                        {errors?.validFrom && errors?.validFrom[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* valid to */}
                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="flex items-center gap-2">
                        <IoCalendarSharp /> Valid To
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "LLL dd, y")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            defaultMonth={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < tomorrow()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage>
                        {errors?.validTo && errors?.validTo[0]}
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
            disabled={isLoading}
            className="flex h-10 w-full max-w-sm items-center justify-center gap-x-2 lg:max-w-xs"
          >
            {isLoading && <ClipLoader size={20} color="#fff" />}
            {!promotion.current ? "Add" : "Update"} Promotion
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
