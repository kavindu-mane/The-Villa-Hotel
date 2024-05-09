"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  RoomsPlacement,
} from "@/components";
import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRouter } from "next/navigation";

export const RoomsLocation: FC = () => {
  const router = useRouter();
  // change room function
  const changeRoom = (name: string) => {
    router.push(`/rooms/location?room=${name}`);
  };

  return (
    <section className="relative h-screen min-h-[40rem]">
      {/* rooms dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="absolute start-5 top-5 z-10 rounded-lg bg-cyan-600 text-white shadow-lg drop-shadow-lg"
        >
          <Button className="flex items-center justify-center">
            Rooms <IoMdArrowDropdown className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ms-5 w-56">
          <DropdownMenuLabel>Rooms Structure</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {Array.from({ length: 8 }).map((_, index) => {
              return (
                // <a key={index} href={changeRoom(`room_${index + 1}`)}>
                <DropdownMenuItem
                  key={index}
                  onClick={() => changeRoom(`room_${index + 1}`)}
                >
                  Room {index + 1}
                </DropdownMenuItem>
                // </a>
              );
            })}
            <DropdownMenuItem onClick={() => changeRoom("default")}>
              Entire Hotel
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* canvas */}
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
