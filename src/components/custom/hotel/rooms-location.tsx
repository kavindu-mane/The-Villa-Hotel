"use client";

import {
  Button,
  RoomsPlacement,
  Tabs,
  TabsList,
  TabsTrigger,
  Calendar,
} from "@/components";
import { FC, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { RxCross2 } from "react-icons/rx";
import { GridLoader } from "react-magic-spinners";
import { roomDetailsAnimation } from "@/animations";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { oneMonthFromNow, tomorrow } from "@/utils";

export const RoomsLocation: FC<{
  setIsStructureShow: (value: boolean) => void;
}> = ({ setIsStructureShow }) => {
  // is top view state
  const [isTopView, setIsTopView] = useState<boolean>(false);
  // is collapse state
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  // room id state
  const [roomId, setRoomId] = useState<number>(1);

  // modifiers coming from backend
  const modifiers = {
    available: [new Date(2024, 4, 12), new Date(2024, 4, 13)],
    notAvailable: [new Date(2024, 4, 14), new Date(2024, 4, 15)],
  };

  return (
    <section className="fixed left-0 right-0 top-0 z-50 h-screen min-h-[40rem] w-full p-5">
      <div className="relative h-full overflow-hidden rounded-lg bg-gray-600">
        <div className="absolute left-2 right-2 top-2 z-[55] flex items-center justify-between">
          {/* tables for view change */}
          <Tabs defaultValue="side" className="">
            <TabsList>
              <TabsTrigger
                value="side"
                onClick={() => setIsTopView(false)}
                aria-selected={!isTopView}
                className="aria-selected:!bg-primary  aria-selected:!text-white"
              >
                Side View
              </TabsTrigger>
              <TabsTrigger
                value="top"
                onClick={() => setIsTopView(true)}
                aria-selected={isTopView}
                className="aria-selected:!bg-primary  aria-selected:!text-white"
              >
                Top View
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* close button */}
          <Button
            onClick={() => setIsStructureShow(false)}
            variant={"outline"}
            className="mb-[3px] h-8 w-8 bg-transparent p-1 text-white hover:bg-transparent hover:text-primary"
          >
            <RxCross2 className="h-6 w-6 text-2xl" />
          </Button>
        </div>

        {/* details window */}
        <div className="absolute end-11 top-2 z-[56] w-full max-w-96 rounded-lg border bg-white px-2 py-0.5 shadow-md drop-shadow-xl">
          {/* room name and collapse button */}
          <div className="flex w-full items-center justify-between">
            {/* title */}
            <h2 className="text-sm font-medium text-gray-600">
              Room {roomId} (Deluxe Room)
            </h2>

            {/* down arrow icon */}
            <div className="z-[9999] flex items-center">
              {isCollapse ? (
                <IoIosArrowDown
                  className="h-7 w-full cursor-pointer rounded-lg bg-primary p-1 font-bold text-white"
                  onClick={() => setIsCollapse(!isCollapse)}
                />
              ) : (
                <IoIosArrowUp
                  className="h-7 w-full cursor-pointer rounded-lg bg-primary p-1 font-bold text-white"
                  onClick={() => setIsCollapse(!isCollapse)}
                />
              )}
            </div>
          </div>

          <motion.div
            className={"max-h-[30rem] overflow-auto"}
            animate={isCollapse ? "closed" : "open"}
            variants={roomDetailsAnimation}
            transition={{ duration: 0.2 }}
            initial="closed"
          >
            <div className="py-2">
              <hr className="border-gray-300 py-1" />
              <p className="">Price : $200 (per night)</p>
              <p className=""></p>
              <p className=""></p>
              <p className=""></p>
              <p className=""></p>

              {/* availability */}
              <h3 className="my-3 font-medium">Availability</h3>
              {/* calender */}
              <div className="mb-3 flex w-full justify-center">
                <Calendar
                  mode="multiple"
                  className="rounded-md border"
                  ISOWeek
                  fromDate={tomorrow()}
                  toDate={oneMonthFromNow()}
                  modifiers={modifiers}
                  modifiersClassNames={{
                    available: "!bg-emerald-300 !rounded-full",
                    notAvailable: "!bg-red-300 !rounded-full",
                  }}
                />
              </div>
              {/* color meanings */}
              <div className="flex w-full items-center justify-end gap-x-4">
                <p className="flex items-center gap-x-1 text-sm">
                  <span className="flex h-3 w-3 bg-emerald-300" />
                  Available
                </p>

                <p className="flex items-center gap-x-1 text-sm">
                  <span className="flex h-3 w-3 bg-red-300" />
                  Not Available
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* canvas */}
        <Suspense
          fallback={
            <Html>
              <GridLoader color="#10b981" />
            </Html>
          }
        >
          <Canvas camera={{ fov: 35, zoom: 5, near: 1, far: 1000 }}>
            <color attach="background" args={["#101010"]} />
            <OrbitControls
              enableDamping={false}
              enableRotate={false}
              enablePan={false}
              enableZoom
              position={[0, 0, 0]}
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
            <Suspense
              fallback={
                <Html>
                  <GridLoader color="#10b981" />
                </Html>
              }
            >
              <RoomsPlacement
                isTopView={isTopView}
                setIsTopView={setIsTopView}
                setRoomId={setRoomId}
              />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>
    </section>
  );
};
