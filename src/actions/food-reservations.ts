"use server";

import { z } from "zod";
import {
  createFoodReservation,
  getAvailableMenuItems,
  getFoodDetailsById,
} from "./utils/foods";
import { RestaurantMenuSchema } from "@/validations";
import {
  getTableReservationById,
  getTableReservationDetails,
  updateTableReservation,
} from "./utils/table-reservations";
import { cookies } from "next/headers";
import { getPromotions } from "./utils/promotions";

export const getAllAvailableFoods = async () => {
  // fetch all menu items from the database
  const foods = await getAvailableMenuItems();

  // return success response with menu items
  return foods;
};

export const createPendingFoodReservation = async (
  data: z.infer<typeof RestaurantMenuSchema>,
) => {
  // get cookies
  const cookieStore = cookies();
  // validate data in backend
  const validatedFields = RestaurantMenuSchema.safeParse(data);

  // check if validation failed and return errors
  if (!validatedFields.success) {
    return { errors: validatedFields.error };
  }

  //destructuring data from validated fields
  const { menu, remark } = validatedFields.data;

  // check pending_reservation cookie if exists
  const reservation = cookieStore.get("pending_table_reservation");

  // if reservation does not exist
  if (!reservation) {
    return { error: "Reservation not found" };
  }

  // check if reservation exists
  const existingReservation = await getTableReservationById(reservation.value);

  if (menu.length > 0) {
    // food array
    const foodArray: {
      foodId: string;
      quantity: number;
      total: number;
    }[] = [];

    // loop through menu and create food array
    menu.forEach(async (item) => {
      const foods = await getFoodDetailsById(item.id);
      foodArray.push({
        foodId: item.id,
        quantity: item.quantity,
        total: (foods?.price || 0) * item.quantity,
      });
    });

    // create pending food reservation
    const foodReservation = await createFoodReservation(
      {
        specialRequirement: remark,
        status: "Ongoing",
        tableReservationId: existingReservation?.id,
      },
      foodArray,
    );

    if (!foodReservation) {
      return { error: "Failed to create food reservation" };
    }

    // get total of all food items
    const sumOfTotal = foodArray.reduce((acc, item) => acc + item.total, 0);
    // if total grater than 5 times of the table price update table price to 0
    if (sumOfTotal > existingReservation?.total! * 5) {
      await updateTableReservation(existingReservation?.id!, {
        total: 0,
      });
    }
  }
  const reservationDetails = await getTableReservationDetails(
    existingReservation?.id!,
  );

  // if reservation details not found
  if (!reservationDetails) {
    return { error: "Failed to get reservation details" };
  }

  // get offers from the database
  // get available offers
  const offers = await getPromotions(1, 5, {
    code: true,
    description: true,
    discount: true,
    id: false,
    validFrom: false,
    validTo: false,
    createdAt: false,
    updatedAt: false,
  });

  return { success: true, data: reservationDetails, offers: offers?.offers };
};
