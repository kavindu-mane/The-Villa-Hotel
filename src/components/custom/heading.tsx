"use client";

import { FC } from "react";

export const Headings: FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="mx-auto max-w-screen-md text-center">
      <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
      <p className="mt-4">{description && description}</p>
    </div>
  );
};
