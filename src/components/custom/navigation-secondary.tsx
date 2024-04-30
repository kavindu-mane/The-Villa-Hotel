"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Brand } from "./brand";

export const NavigationBarSecondary: FC = () => {
  return (
    <nav className="flex w-full items-center justify-center px-2 py-5 lg:px-5">
      <div className="max-w-screen-2xl text-2xl w-full px-3 py-0.5">
        <Link href={"/"}>
          <Brand />
        </Link>
      </div>
    </nav>
  );
};
