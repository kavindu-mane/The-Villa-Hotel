"use client";

import { HotelModel } from "@/components";
import { Html, PresentationControls, Stage } from "@react-three/drei";
import { FC, Suspense } from "react";
import { GridLoader } from "react-magic-spinners";

export const RoomsPlacement: FC<{
  isTopView: boolean;
  setIsTopView: (value: boolean) => void;
  setRoomId: (value: number) => void;
}> = ({ isTopView, setIsTopView, setRoomId }) => {
  return (
    <PresentationControls speed={1.5} polar={[0, 0]}>
      <Stage environment={"city"} intensity={0.3} shadows={false}>
        {/* models */}
        <Suspense
          fallback={
            <Html>
              <GridLoader color="#10b981" />
            </Html>
          }
        >
          <HotelModel
            setIsTopView={setIsTopView}
            isTopView={isTopView}
            setRoomId={setRoomId}
          />
        </Suspense>
      </Stage>
    </PresentationControls>
  );
};
