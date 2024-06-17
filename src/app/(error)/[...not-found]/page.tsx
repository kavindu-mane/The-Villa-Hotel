import { NavigationWrapper } from "@/components";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="flex h-full flex-col items-center justify-between gap-y-32">
      <NavigationWrapper />
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl md:text-5xl">404 | Page Not Found</h1>
        <Link
          href={"/"}
          className="rounded-md bg-emerald-600 px-4 py-2 text-white duration-300 hover:bg-emerald-700"
        >
          Go back to home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
