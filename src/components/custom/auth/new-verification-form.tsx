"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verifications";
import { BiError } from "react-icons/bi";

export const NewVerificationEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        }
        if (res.success) {
          setSuccess(res.success);
        }
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-xl">Verify Email</h1>
      <div className="flex w-full flex-col items-center justify-center">
        {!success && !error && <BeatLoader size={"20px"} color="#059669" />}

        {success && (
          <div className="flex w-full items-end justify-center gap-x-2 rounded-lg  bg-emerald-200/70 p-2 text-emerald-700">
            {success}
          </div>
        )}

        {error && (
          <div className="flex w-full items-end justify-center gap-x-2 rounded-lg  bg-red-200/70 p-2 text-red-700">
            <BiError className="h-5 w-5" /> {error}
          </div>
        )}
      </div>

      <Link href={"/auth/login"}>
        <Button variant={"outline"} className="border-primary">
          Go to Login
        </Button>
      </Link>
    </div>
  );
};
