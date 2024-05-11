"use client";

import { Button } from "@/components";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from "react-magic-spinners";

export const GoogleAuth: FC = () => {
  // sign in via google
  const signInWithGoogle = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/" }).then(() => {
      setIsLoading(false);
    });
  };
  // is loading state
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="outline"
      type="submit"
      onClick={signInWithGoogle}
      className="mt-5 flex w-full items-center justify-center gap-x-2"
    >
      {!isLoading && <FcGoogle className="h-6 w-6" />}
      {isLoading && <ClipLoader size={20} color="#000" />}
      Login with Google
    </Button>
  );
};
