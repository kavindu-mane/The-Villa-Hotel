"use client";

import { errorTypes } from "@/types";
import { ResetPasswordSchema } from "@/validations";
import { FC, useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../..";
import { reset } from "@/actions/reset";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// default value for errors
const errorDefault: errorTypes = {
  email: [],
  message: "",
};

export const ResetForm: FC = () => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  // transition hook
  const [isPending, startTransition] = useTransition();

  // form hook
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setErrors(errorDefault);
    setSuccess(undefined);
    startTransition(() => {
      reset(data).then((data) => {
        if (data?.error) {
          setErrors({
            ...errors,
            message: data?.error,
          });
        } else {
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <div className="">
      <div className="mb-10 grid gap-2 text-center">
        <h1 className="mb-5 text-3xl font-medium">Forget Password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email to reset your password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            Send Reset Email
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex items-center justify-center gap-x-1.5 text-sm">
        <Link href={"/auth/login"}>
          <Button
            variant={"ghost"}
            className="w-fit p-0 underline hover:bg-transparent"
          >
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};
