"use client";

import { contactUs } from "@/actions/contact-us";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components";
import { errorTypes } from "@/types";
import { transferZodErrors } from "@/utils";
import { ContactUsSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { z } from "zod";

// default value for errors
const errorDefault: errorTypes = {
  email: [],
  password: [],
  message: "",
};

export const ContactForm: FC = () => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  // transition hook
  const [isPending, startTransition] = useTransition();
  // form hook
  const form = useForm<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof ContactUsSchema>) => {
    setErrors(errorDefault);
    setSuccess(undefined);
    startTransition(() => {
      contactUs(data).then((data) => {
        if (data?.errors) {
          setErrors(transferZodErrors(data.errors).error);
        } else if (data?.error) {
          setErrors({
            ...errors,
            message: data?.error,
          });
        } else {
          setSuccess(data?.success);
          form.reset();
        }
      });
    });
  };

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-md border bg-white p-3 md:w-1/2 lg:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="h-10" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage>{errors?.name && errors?.name[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors?.email && errors?.email[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* message field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Type your message here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errors?.message && errors?.message[0]}
                </FormMessage>
              </FormItem>
            )}
          />

          {/*common error message */}
          {errors?.message && (
            <FormMessage className="flex items-end justify-center gap-x-2 rounded-lg bg-red-200/70 p-2 text-red-500">
              <BiError className="h-5 w-5" />
              {errors?.message}
            </FormMessage>
          )}

          {/* success message */}
          {success && (
            <FormMessage className="flex items-end justify-center gap-x-2 rounded-lg bg-emerald-200/70 p-2 text-emerald-700">
              {success}
            </FormMessage>
          )}

          {/* submit button */}
          <Button
            disabled={isPending}
            type="submit"
            className="flex w-full items-center justify-center gap-x-3"
          >
            {isPending && (
              <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin text-white" />
            )}
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};
