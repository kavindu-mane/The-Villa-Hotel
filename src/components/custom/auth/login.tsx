"use client";

import { errorTypes } from "@/types";
import { LoginFormSchema } from "@/validations";
import { FC, useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
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
} from "../..";
import { login } from "@/actions/login";
import { useToast } from "@/components/ui/use-toast";
import { transferZodErrors } from "@/utils";

// default value for errors
const errorDefault: errorTypes = {
  email: [],
  password: [],
  message: "",
};

export const Login: FC<{ setIsAuthOpen: (value: boolean) => void }> = ({
  setIsAuthOpen,
}) => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  // toast hook
  const { toast } = useToast();
  // transition hook
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      login(data).then((data) => {
        if (data.errors) {
          setErrors(transferZodErrors(data.errors).error);
        } else {
          toast({
            description: data.success,
            className: "bg-primary rounded-lg text-white",
          });
          setIsAuthOpen(false);
        }
      });
    });
  };

  return (
    <div className="">
      <div className="mb-10 grid gap-2 text-center">
        <h1 className="mb-5 text-3xl font-medium">Login</h1>
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

          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
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
