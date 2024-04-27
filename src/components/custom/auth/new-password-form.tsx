"use client";

import { errorTypes } from "@/types";
import { NewPasswordSchema } from "@/validations";
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
import { newPassword } from "@/actions/new-password";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSearchParams } from "next/navigation";

// default value for errors
const errorDefault: errorTypes = {
  password: [],
  repeat_password: [],
  message: "",
};

export const NewPasswordForm: FC = () => {
  // error state
  const [errors, setErrors] = useState(errorDefault);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  // transition hook
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  // form hook
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      repeat_password: "",
    },
  });

  // form submit handler
  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setErrors(errorDefault);
    setSuccess(undefined);
    startTransition(() => {
      newPassword(data, token).then((data) => {
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
            Reset Password
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
