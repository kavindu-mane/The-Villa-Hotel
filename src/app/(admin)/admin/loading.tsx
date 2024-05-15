import React from "react";
import { GridLoader } from "react-magic-spinners";

const Loading = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <GridLoader color="#10b981" />
    </section>
  );
};

export default Loading;
