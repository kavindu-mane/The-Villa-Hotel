import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <ScaleLoader color="#36d7b7" />
    </section>
  );
};

export default Loading;
