import { db } from "@/lib/db";

// reserve room
export const reserveRoom = async (
  room_number: number,
  checkIn: Date,
  checkOut: Date,
  total: number,
) => {
  try {
    const reservation = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        total,
        room: {
          connect: {
            number: room_number,
          },
        },
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};