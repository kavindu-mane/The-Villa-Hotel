import { db } from "@/lib/db";

// booking room function
export const bookRoom = async (
  roomId: string,
  startDate: Date,
  endDate: Date,
  total: number,
  userId?: string,
  email?: string,
  name?: string,
  phone?: string,
  remark?: string,
) => {
  // Start a transaction
  const booking = await db.$transaction([
    // Check if the room is available
    db.rooms.findFirst({
      where: {
        id: roomId,
        booking: {
          none: {
            OR: [{ checkIn: { gt: endDate } }, { checkOut: { lt: startDate } }],
          },
        },
      },
      cacheStrategy: { ttl: 60 },
    }),
    // Create a 'Pending' booking
    db.booking.create({
      data: {
        roomId,
        userId,
        total,
        email,
        name,
        phone,
        remark,
        checkIn: startDate,
        checkOut: endDate,
        status: "Pending",
      },
    }),
  ]);

  // Try to confirm the booking
  // const confirmationResult = await confirmBooking(booking[0]?.id || "");

  // if (confirmationResult.success) {
  //   // Step 4: If the confirmation is successful, update the booking's status to 'confirmed'
  //   await db.booking.update({
  //     where: { id: booking[0]?.id },
  //     data: { status: "Confirmed" },
  //   });
  // } else {
  //   // If the confirmation fails, delete the 'pending' booking
  //   await db.booking.delete({ where: { id: booking[0]?.id } });
  // }
};

// confirm booking function
const confirmBooking = async (bookingId: string) => {
  try {
    // Find the booking
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { room: true },
      cacheStrategy: { ttl: 60 },
    });

    // Check if the room is still available
    if (!booking) {
      return { success: false };
    }
    const available = await db.rooms.findFirst({
      where: {
        id: booking.room.id,
        booking: {
          none: {
            OR: [
              { checkIn: { gt: booking.checkOut } },
              { checkOut: { lt: booking.checkIn } },
            ],
          },
        },
      },
      cacheStrategy: { ttl: 60 },
    });

    // If the room is available, return success
    if (available) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (e) {
    return { success: false };
  }
};
