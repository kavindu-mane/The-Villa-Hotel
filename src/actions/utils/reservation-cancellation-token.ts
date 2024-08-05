import { db } from "@/lib/db";

// get cancel reservation token by reservation id
export const getReservationCancelTokenByReservationId = async (
  reservationId: string,
) => {
  try {
    const reservationCancelToken = await db.reservationCancelToken.findFirst({
      where: {
        OR: [
          {
            roomReservationId: reservationId,
          },
          {
            tableReservationId: reservationId,
          },
        ],
      },
    });
    return reservationCancelToken;
  } catch (e) {
    return null;
  }
};

// get cancel reservation token by token and reservation id
export const getReservationCancelTokenByToken = async (
  token: string,
  reservationId: string,
) => {
  try {
    const reservationCancelToken = await db.reservationCancelToken.findFirst({
      where: {
        token,
        OR: [
          {
            roomReservationId: reservationId,
          },
          {
            tableReservationId: reservationId,
          },
        ],
      },
    });
    return reservationCancelToken;
  } catch (e) {
    return null;
  }
};
