"use client";

import { getAllAvailableRooms } from "@/actions/room-reservations";
import {
  Badge,
  BookingCard,
  Button,
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Headings,
  Label,
  RadioGroup,
  RadioGroupItem,
  RoomsLocation,
  Skeleton,
} from "@/components";
import { minimalRoomReservationData } from "@/types";
import { ReservationsSchema } from "@/validations";
import { RoomType } from "@prisma/client";
import { DotIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { TbView360Number } from "react-icons/tb";
import { FC, Suspense, useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Preload } from "@react-three/drei";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

export const Rooms: FC = () => {
  // is structure button state
  const [isStructureShow, setIsStructureShow] = useState(false);
  // is 360 image show state
  const [is360Show, setIs360Show] = useState(false);
  // 360 image url
  const [room360Url, setRoom360Url] = useState<string | null>(null);
  // get use search params
  const searchParams = useSearchParams();
  // status of available rooms
  const [selectedRoom, setSelectedRoom] = useState<
    minimalRoomReservationData[]
  >([]);
  const [otherRooms, setOtherRooms] = useState<minimalRoomReservationData[]>(
    [],
  );
  const [roomError, setRoomError] = useState<string | null>(null);
  const [otherRoomError, setOtherRoomError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // get available rooms when component mounts
  // if all search params are available
  const getAvailableRooms = useCallback(async () => {
    if (
      searchParams.has("room_type") &&
      searchParams.has("from") &&
      searchParams.has("to")
    ) {
      const roomType = searchParams.get("room_type");
      const from = searchParams.get("from");
      const to = searchParams.get("to");

      const formData = {
        date: {
          from: new Date(from!!),
          to: new Date(to!!),
        },
        room_type: roomType as RoomType,
      };

      const validatedData = ReservationsSchema.safeParse(formData);
      if (!validatedData.success) {
        setLoading(false);
        return null;
      }

      setLoading(true);

      // reset values and errors
      setSelectedRoom([]);
      setOtherRooms([]);
      setRoomError(null);
      setOtherRoomError(null);

      await getAllAvailableRooms(validatedData.data)
        .then((data) => {
          if (data.error) {
            setRoomError(data.error);
          }
          if (data.otherError) {
            setOtherRoomError(data.otherError);
          }
          if (data.rooms) {
            setSelectedRoom(data.rooms as minimalRoomReservationData[]);
          }
          if (data.other) {
            setOtherRooms(data.other as minimalRoomReservationData[]);
          }
        })
        .catch((error) => {
          setRoomError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  // get available rooms
  useEffect(() => {
    getAvailableRooms();
  }, [getAvailableRooms]);

  // use Effect for disable scroll
  useEffect(() => {
    const documentElement = document.documentElement.classList;
    if (isStructureShow) {
      documentElement.add("overflow-hidden");
    } else {
      documentElement.remove("overflow-hidden");
    }
  }, [isStructureShow]);

  return (
    <section className="flex w-full flex-col gap-y-8 px-5 py-16">
      {/* title */}
      <Headings
        title="Reservations"
        description="Book a room with us today and enjoy a comfortable stay in our luxurious hotel."
      />

      {/* booking card */}
      <BookingCard />

      {/* structure button */}
      <div className="flex flex-col items-center justify-center gap-y-4 italic text-gray-700">
        <p className="">
          Explore our hotel structure and find the perfect room for your stay.
        </p>
        <Button
          onClick={() => setIsStructureShow(true)}
          className="bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500"
        >
          Hotel Structure
        </Button>
      </div>

      {/* show loaded skeleton*/}
      {loading && (
        <div className="flex flex-col gap-y-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="">
              <Skeleton className="mb-5 h-8 w-1/2 max-w-sm" />
              <div className="flex gap-4">
                <RoomCardSkeleton className="" />
                <RoomCardSkeleton className="hidden sm:block" />
                <RoomCardSkeleton className="hidden lg:block" />
                <RoomCardSkeleton className="hidden 2xl:block" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* show rooms */}
      {!loading && (
        <div className="">
          {(roomError || selectedRoom.length > 0) && (
            <h2 className="mb-3 text-lg font-medium">
              {searchParams.get("room_type")} Rooms
            </h2>
          )}
          <div className="flex flex-wrap gap-4">
            {/* show selected rooms */}
            {selectedRoom.map((room, index) => (
              <RoomCard
                key={index}
                id={index}
                room={room}
                from={new Date(searchParams.get("from")!!)}
                to={new Date(searchParams.get("to")!!)}
                setRoom360Url={setRoom360Url}
                setIs360Show={setIs360Show}
              />
            ))}
            {/* show error message */}
            {roomError && (
              <p className="w-full text-center text-red-500">{roomError}</p>
            )}
          </div>
          {/* show error message */}
          {(otherRoomError || otherRooms.length > 0) && (
            <h2 className="mb-3 mt-8 text-lg font-medium">Other Rooms</h2>
          )}
          <div className="flex flex-wrap gap-4">
            {/* show other rooms */}
            {otherRooms.map((room, index) => (
              <RoomCard
                key={index}
                id={index}
                room={room}
                from={new Date(searchParams.get("from")!!)}
                to={new Date(searchParams.get("to")!!)}
                setRoom360Url={setRoom360Url}
                setIs360Show={setIs360Show}
              />
            ))}
          </div>
          {/* show error message */}
          {otherRoomError && (
            <p className="w-full text-center text-red-500">{otherRoomError}</p>
          )}
        </div>
      )}

      {/* show  structure*/}
      {isStructureShow && (
        <RoomsLocation setIsStructureShow={setIsStructureShow} />
      )}

      {/* room 360 popup */}
      {is360Show && (
        <Room360Popup setIs360Show={setIs360Show} room360Url={room360Url} />
      )}
    </section>
  );
};

const ImageCarousal = ({ data }: { data: string[] }) => {
  return (
    <Carousel className="relative overflow-hidden rounded-md">
      <CarouselContent>
        {data.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              width={500}
              height={300}
              alt="room"
              className="h-44 w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="start-1 bg-white/20 text-white" />
      <CarouselNext className="end-1 bg-white/20 text-white" />
    </Carousel>
  );
};

const RoomCard = ({
  room,
  from,
  to,
  setRoom360Url,
  setIs360Show,
  id,
}: {
  room: minimalRoomReservationData;
  from: Date;
  to: Date;
  setRoom360Url: (value: string | null) => void;
  setIs360Show: (value: boolean) => void;
  id: number;
}) => {
  const [type, setType] = useState<string>("Full_Board");
  // router hook
  const router = useRouter();
  const submitHandler = () => {
    router.push(
      `/reservations?room_number=${room.number}&from=${format(from, "yyyy-MM-dd")}&to=${format(to, "yyyy-MM-dd")}&type=${type}`,
    );
  };

  return (
    <Card className="max-w-md rounded-md shadow-md drop-shadow-md">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-primary">{room.type}</Badge>
          <p className="text-sm text-gray-600">Room No : {room.number}</p>
        </div>

        {/* Carousal */}
        <ImageCarousal data={room.images.data} />

        {/* show features */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {room.features.data.map((feature, index) => (
            <p key={index} className="flex items-center text-sm text-gray-600">
              <DotIcon className="h-5 w-5" />
              {feature}
            </p>
          ))}
        </div>
        {/* persons */}
        <p className="text-sm font-medium text-slate-800">
          Persons : {room.persons}
        </p>
        {/* price and booking*/}
        <div className="flex items-center justify-between">
          <div className="">
            <RadioGroup
              defaultValue="Full_Board"
              className="gap-y-1"
              onValueChange={(value) => setType(value)}
            >
              <div className="flex items-center">
                <RadioGroupItem
                  id={`r1-${id}`}
                  value="Full_Board"
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`r1-${id}`}
                  className="flex h-7 w-44 cursor-pointer items-center justify-between rounded-lg bg-gray-500 px-3 py-1.5 text-white peer-aria-checked:bg-green-600"
                >
                  {room.price + 30}$ Full Board
                  {type === "Full_Board" && (
                    <FaCheckCircle className="ms-2 h-4 w-4" />
                  )}
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem
                  id={`r2-${id}`}
                  value="Half_Board"
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`r2-${id}`}
                  className="flex h-7 w-44 cursor-pointer items-center justify-between rounded-lg bg-gray-500 px-3 py-1.5 text-white peer-aria-checked:bg-green-600"
                >
                  {room.price}$ Half Board
                  {type === "Half_Board" && (
                    <FaCheckCircle className="ms-2 h-4 w-4" />
                  )}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-x-1">
            {/* show 360 button if 360 url is available */}
            {room.images360 && (
              <Button
                variant={"ghost"}
                onClick={() => {
                  setRoom360Url(room.images360);
                  setIs360Show(true);
                }}
              >
                <TbView360Number className="h-6 w-6" />
              </Button>
            )}
            <Button
              onClick={submitHandler}
              className="bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const RoomCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("w-full max-w-md rounded-md shadow-md", className)}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        {/* Carousal */}
        <Skeleton className="h-40 w-full" />
        {/* show features */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-28" />
          ))}
        </div>
        {/* persons */}
        <Skeleton className="h-6 w-28" />
        {/* price and booking*/}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-x-1">
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const Room360Popup = ({
  setIs360Show,
  room360Url,
}: {
  setIs360Show: (value: boolean) => void;
  room360Url: string | null;
}) => {
  const maps = useLoader(THREE.TextureLoader, room360Url!);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-screen min-h-[40rem] w-full p-5">
      <div className="relative h-full overflow-hidden rounded-lg bg-gray-600">
        <div className="absolute left-2 right-2 top-2 z-[55] flex items-center justify-end">
          <Button
            onClick={() => setIs360Show(false)}
            className="absolute right-5 top-5 bg-white/50 text-white"
          >
            Close
          </Button>
        </div>
        <Canvas frameloop="demand" camera={{ position: [0, 0, 1] }}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            autoRotate={false}
            rotateSpeed={-0.5}
          />
          <Suspense fallback={null}>
            <Preload all />
            <group>
              <mesh>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial map={maps} side={THREE.BackSide} />
              </mesh>
            </group>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
