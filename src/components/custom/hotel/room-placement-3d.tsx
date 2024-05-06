"use client";

import { HotelModel } from "@/components";
import { PresentationControls, Stage } from "@react-three/drei";

export const RoomsPlacement = () => {
  return (
    <PresentationControls
      speed={1.5}
      global
      zoom={1.5}
      polar={[0, Math.PI / 2]}
    >
      <Stage environment={"city"} intensity={0.3} shadows={false}>
        {/* models */}
        <HotelModel />
      </Stage>
    </PresentationControls>
  );
};
