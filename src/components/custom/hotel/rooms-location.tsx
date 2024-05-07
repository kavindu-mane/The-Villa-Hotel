"use client";

import { RoomsPlacement } from "@/components";
import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const RoomsLocation: FC = () => {
  return (
    <section className="h-screen">
      <Canvas camera={{ fov: 35, zoom: 5, near: 1, far: 1000 }}>
        <color attach="background" args={["#101010"]} />
        <OrbitControls
          enableDamping={false}
          enableRotate={false}
          enablePan={false}
          enableZoom
          rotation={[0.1, 0, 0]}
          maxDistance={200}
          minDistance={20}
        />
        <directionalLight position={[0, 3, 1]} intensity={1.2} />
        <ambientLight intensity={0.4} />
        <hemisphereLight
          color={"#777777"}
          groundColor={"#000000"}
          intensity={1}
        />
        <RoomsPlacement />
      </Canvas>
    </section>
  );
};
