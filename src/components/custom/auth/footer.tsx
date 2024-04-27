"use client";

import { Button } from "@/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const AuthFooter: FC = () => {
  const router = usePathname();
  const currentPath = router.split("/").pop();

  return (
    <div className="mt-4 flex items-center justify-center gap-x-1.5 text-sm">
      {currentPath === "login" && <span>Don&apos;t</span>}
      {currentPath === "register" && <span>Already</span>}
      have an account?
      <Link href={currentPath === "login" ? "/auth/register" : "/auth/login"}>
        <Button
          variant={"ghost"}
          className="w-fit p-0 underline hover:bg-transparent"
        >
          {currentPath === "login" ? "Register" : "Login"}
        </Button>
      </Link>
    </div>
  );
};
