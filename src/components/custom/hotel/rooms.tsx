"use client";

import { getAllAvailableRooms } from "@/actions/room-booking";
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
  RoomsLocation,
} from "@/components";
import { minimalRoomReservationData } from "@/types";
import { BookingSchema } from "@/validations";
import { RoomType } from "@prisma/client";
import { DotIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { TbView360Number } from "react-icons/tb";
import { FC, useCallback, useEffect, useState } from "react";

export const Rooms: FC = () => {
  // is structure button state
  const [isStructureShow, setIsStructureShow] = useState(false);
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
      searchParams.has("persons") &&
      searchParams.has("from") &&
      searchParams.has("to")
    ) {
      const roomType = searchParams.get("room_type");
      const persons = searchParams.get("persons");
      const from = searchParams.get("from");
      const to = searchParams.get("to");

      const formData = {
        date: {
          from: new Date(from!!),
          to: new Date(to!!),
        },
        room_type: roomType as RoomType,
        persons,
      };

      const validatedData = BookingSchema.safeParse(formData);
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

      {/* show loaded rooms */}
      {loading && (
        <p className="w-full text-center text-gray-500">Loading...</p>
      )}

      {/* show rooms */}
      {!loading && (
        <div className="">
          <h2 className="mb-2 text-lg">
            {searchParams.get("room_type")} Rooms
          </h2>
          <div className="flex flex-wrap gap-3">
            {/* show selected rooms */}
            {selectedRoom.map((room, index) => (
              <RoomCard key={index} room={room} />
            ))}
            {/* show error message */}
            {roomError && (
              <p className="w-full text-center text-red-500">{roomError}</p>
            )}
          </div>
          <h2 className="mb-2 mt-5 text-lg">Other Rooms</h2>
          <div className="flex flex-wrap gap-3">
            {/* show other rooms */}
            {otherRooms.map((room, index) => (
              <RoomCard key={index} room={room} />
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

const RoomCard = ({ room }: { room: minimalRoomReservationData }) => {
  return (
    <Card className="max-w-sm shadow-md drop-shadow-md rounded-md">
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
          <p className="text-lg font-semibold">${room.price}</p>
          <div className="flex items-center gap-x-1">
            <Button variant={"ghost"}>
              <TbView360Number className="h-6 w-6" />
            </Button>
            <Button className="bg-gradient-to-r from-fuchsia-600 to-cyan-700 px-5 shadow-md drop-shadow-lg hover:from-cyan-700 hover:to-fuchsia-500">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
