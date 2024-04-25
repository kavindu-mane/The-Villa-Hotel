"use client";

import { errorTypes } from "@/types";
import { LoginFormSchema } from "@/validations";
import { FC, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { transferZodErrors } from "@/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "..";

// default value for errors
const errorDefault: errorTypes = {
  email: [],
  password: [],
  message: "",
};

export const Login: FC = () => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  // loading state
  const [loading, setLoading] = useState(false);
  // toast hook
  const { toast } = useToast();

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
    setLoading(true);
    setErrors(errorDefault);
    await axios
      .post("/login", data)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Login successful",
            description: "",
            className: "bg-green-500 text-white",
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          // if any validation error occurred
          setErrors(transferZodErrors(err.response.data).error);
        } else {
          setErrors((prev) => ({
            ...prev,
            message: err?.response?.data.message || err.message || err,
          }));
        }
      })
      .finally(() => {
        setLoading(false);
        form.reset();
      });
  };
  return (
    <div className="">
      <div className="mb-10 grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
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
                    href="/forgot-password"
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
          <FormMessage>{errors?.message}</FormMessage>

          <Button disabled={loading} type="submit" className="w-full">
            Login
          </Button>

          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-x-2"
          >
            <FcGoogle className="h-6 w-6" />
            Login with Google
          </Button>
        </form>
      </Form>
    </div>
  );
};
