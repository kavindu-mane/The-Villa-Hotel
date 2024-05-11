"use client";

import { HotelModel } from "@/components";
import { Html, PresentationControls, Stage } from "@react-three/drei";
import { FC, Suspense } from "react";
import { GridLoader } from "react-magic-spinners";

export const RoomsPlacement: FC<{
  isTopView: boolean;
  setIsTopView: (value: boolean) => void;
}> = ({ isTopView, setIsTopView }) => {

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
          <HotelModel setIsTopView={setIsTopView} isTopView={isTopView} />
        </Suspense>
      </Stage>
    </PresentationControls>
  );
};
