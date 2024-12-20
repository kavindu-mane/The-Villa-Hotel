"use client";

import { HotelModel } from "@/components";
import {
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import { FC } from "react";

export const RoomsPlacement: FC<{
  isTopView: boolean;
  setIsTopView: (value: boolean) => void;
  setRoomId: (value: number) => void;
}> = ({ isTopView, setIsTopView, setRoomId }) => {
  return (
    <PresentationControls speed={1.5} polar={[0, 0]}>
      <Stage environment={"city"} intensity={0.3} shadows={false}>
        {/* models */}
        <HotelModel
          setIsTopView={setIsTopView}
          isTopView={isTopView}
          setRoomId={setRoomId}
        />
      </Stage>
      <mesh rotation={[-Math.PI / 2 + 0.02, 0, 0.36]} position={[0, -3.75, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color="#101010"
          mirror={0}
          resolution={1024}
          blur={[300, 200]}
          mixBlur={2}
          mixStrength={15}
          roughness={0.4}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1}
          metalness={1.5}
        />
      </mesh>
    </PresentationControls>
  );
};
