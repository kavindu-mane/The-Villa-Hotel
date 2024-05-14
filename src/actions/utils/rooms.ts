import { db } from "@/lib/db";

// get available rooms
export const getAvailableRooms = async (
  roomType: "Deluxe" | "Superior" | "Standard",
  startDate: Date,
  endDate: Date,
) => {
  try {
    const rooms = await db.rooms.findMany({
      where: {
        type: roomType,
        booking: {
          none: {
            OR: [
              {
                checkIn: {
                  gt: endDate,
                },
              },
              {
                checkOut: {
                  lt: startDate,
                },
              },
            ],
          },
        },
      },
      select: {
        number: true,
        price: true,
        type: true,
        _count: true,
      },
      cacheStrategy: { ttl: 60 },
    });
    return rooms;
  } catch (e) {
    return null;
  }
};

// get other available rooms
export const getOtherAvailableRooms = async (
  room_type: "Deluxe" | "Superior" | "Standard",
  startDate: Date,
  endDate: Date,
) => {
  try {
    const rooms = await db.rooms.findMany({
      where: {
        type: {
          not: room_type,
        },
        booking: {
          none: {
            OR: [
              {
                checkIn: {
                  gt: endDate,
                },
              },
              {
                checkOut: {
                  lt: startDate,
                },
              },
            ],
          },
        },
      },
      select: {
        number: true,
        price: true,
        type: true,
        _count: true,
      },
      cacheStrategy: { ttl: 60 },
    });
    return rooms;
  } catch (e) {
    return null;
  }
};

// get room by number
export const getRoomByNumber = async (number: number) => {
  try {
    const room = await db.rooms.findUnique({
      where: {
        number,
      },
      cacheStrategy: { ttl: 60 },
    });
    return room;
  } catch (e) {
    return null;
  }
};
