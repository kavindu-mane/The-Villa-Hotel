"use client";

import { PresentationControls, Stage } from "@react-three/drei";

export const CustomizedRoom = () => {
  return (
    <PresentationControls
      speed={1.5}
      global
      zoom={0.7}
      polar={[-0.1, Math.PI / 4]}
    >
      <Stage environment={"city"} intensity={0.6} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </PresentationControls>
  );
};
