"use client";

import { errorTypes } from "@/types";
import { LoginFormSchema } from "@/validations";
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
} from "@/components";
import { login } from "@/actions/login";
import { transferZodErrors } from "@/utils";
import { useSearchParams } from "next/navigation";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// default value for errors
const errorDefault: errorTypes = {
  email: [],
  password: [],
  message: "",
};

export const Login: FC = () => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  // transition hook
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This email is already use with different provider"
      : "";

  // form hook
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setErrors(errorDefault);
    setSuccess(undefined);
    startTransition(() => {
      login(data).then((data) => {
        if (data?.errors) {
          setErrors(transferZodErrors(data.errors).error);
        } else if (data?.error) {
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
        <h1 className="mb-5 text-3xl font-medium">Welcome Back!</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and password below to login to your account
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

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex w-full justify-between">
                  Password
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="h-10"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errors?.password && errors?.password[0]}
                </FormMessage>
              </FormItem>
            )}
          />

          {/*common error message */}
          {(errors?.message || urlError) && (
            <FormMessage className="flex items-end justify-center gap-x-2 rounded-lg bg-red-200/70 p-2 text-red-500">
              <BiError className="h-5 w-5" />
              {errors?.message || urlError}
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
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
