"use client";

import { errorTypes } from "@/types";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { RegisterFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { transferZodErrors } from "@/utils";
import { FcGoogle } from "react-icons/fc";
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
} from "../ui";

// default value for errors
const errorDefault: errorTypes = {
  name: [],
  email: [],
  password: [],
  repeat_password: [],
  message: "",
};

export const Register: FC = () => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  // loading state
  const [, setLoading] = useState(false);
  // toast hook
  const { toast } = useToast();

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
    setLoading(true);
    setErrors(errorDefault);
    await axios
      .post("/register", data)
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: "Account created successfully",
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
        <h1 className="text-3xl font-bold">Register</h1>
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
          <FormMessage>{errors?.message}</FormMessage>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-x-2"
          >
            <FcGoogle className="h-6 w-6" />
            Sign up with Google
          </Button>
        </form>
      </Form>
    </div>
  );
};
