"use client";

import { TableModel } from "@/components";
import {
  Html,
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import { FC, Suspense } from "react";
import { GridLoader } from "react-magic-spinners";

export const TablePlacement: FC<{
  isTopView: boolean;
  setIsTopView: (value: boolean) => void;
  setRoomId: (value: number) => void;
}> = ({ isTopView, setIsTopView, setRoomId }) => {
  return (
    <PresentationControls speed={1.5} polar={[0, 0]}>
      <Stage environment={"city"} intensity={0.3} shadows={false}>
        {/* models */}
        <TableModel
          setIsTopView={setIsTopView}
          isTopView={isTopView}
          setRoomId={setRoomId}
        />
      </Stage>
      <mesh rotation={[-Math.PI / 2 + 0.02, 0, 0.36]} position={[0, -13, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color="#974d13"
          mirror={0}
          resolution={1024}
          blur={[200, 100]}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={0.6}
          minDepthThreshold={0.3}
          maxDepthThreshold={0.9}
          metalness={0}
        />
      </mesh>
    </PresentationControls>
  );
};
