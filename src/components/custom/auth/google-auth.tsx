"use client";

import { Button } from "@/components";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";

export const GoogleAuth: FC = () => {
  // sign in via google
  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <Button
      variant="outline"
      type="submit"
      onClick={signInWithGoogle}
      className="mt-5 flex w-full items-center justify-center gap-x-2"
    >
      <FcGoogle className="h-6 w-6" />
      Login with Google
    </Button>
  );
};
