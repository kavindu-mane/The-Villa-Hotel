"use client";

import { CustomizedRoom } from "@/components";
import { FC } from "react";
import { Canvas } from "@react-three/fiber";

export const Customize: FC = () => {
  return (
    <section className="h-screen">
      <Canvas>
        <color attach="background" args={["#213547"]} />
        <CustomizedRoom />
      </Canvas>
    </section>
  );
};
