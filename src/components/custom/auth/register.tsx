"use client";

import { errorTypes } from "../../../types";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../../ui/use-toast";
import { RegisterFormSchema } from "../../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferZodErrors } from "../../../utils";
import { BiError } from "react-icons/bi";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "../../ui";
import { register } from "@/actions/register";
import { useSearchParams } from "next/navigation";

// default value for errors
const errorDefault: errorTypes = {
  name: [],
  email: [],
  password: [],
  repeat_password: [],
  message: "",
};

export const Register: FC<{
  setIsAuthOpen: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
}> = ({ setIsAuthOpen, setIsLogin }) => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  // toast hook
  const { toast } = useToast();
  // transition hook
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  // form hook
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    setErrors(errorDefault);
    startTransition(() => {
      register(data).then((data) => {
        if (data.errors) {
          setErrors(transferZodErrors(data.errors).error);
        } else if (data?.error) {
          setErrors({
            ...errors,
            message: data?.error,
          });
        } else {
          toast({
            description: data?.success,
            className: "bg-primary rounded-lg text-white",
          });
          setIsAuthOpen(false);
          setIsLogin(true);
        }
      });
    });
  };

  return (
    <div className="">
      <div className="mb-10 grid gap-2 text-center">
        <h1 className="mb-5  text-3xl font-medium">Register</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

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

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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

          {/* repeat password */}
          <FormField
            control={form.control}
            name="repeat_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="h-10"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errors?.repeat_password && errors?.repeat_password[0]}
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
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </div>
  );
};
