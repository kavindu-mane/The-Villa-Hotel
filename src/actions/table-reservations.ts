"use server";

import { TableReservationsSchema, TableReservationFormSchema } from "@/validations";
import z from "zod";
import {
  getAllTables,
  getAvailableTables,
  getTableByNumber,
} from "@/actions/utils/tables";
import { TableType } from "@prisma/client";
import {
  checkTableAvailability,
  deleteTableReservation,
  getTableReservationById,
  getTableReservationByNumber,
  updateTableReservationStatus,
} from "@/actions/utils/table-reservations";
import { cookies } from "next/headers";
import { getPromotionByCode, getPromotions } from "./utils/promotions";
import { createTableReservation, updateTableReservation } from "./admin/utils/tables-reservation-admin";
import md5 from "md5";
import { getUserByEmail } from "./utils/user";
import { addPaymentRecord } from "./utils/payments";
// import { roomReservationConfirmEmailTemplate } from "@/templates/room-reservation-confirm-email";
import { sendEmails } from "./utils/email";
import { Value } from "@radix-ui/react-select";
import { table } from "console";

/**
 * Create action for table booking form
 * @returns - available tables
 */

// export const getAvailableTables = async (values: z.infer<typeof TableReservationFormSchema>) => {
//   // validate data in backend
//   const validatedFields = TableReservationsSchema.safeParse(values);

//   //check if validation failed and return errors
//   if (!validatedFields.success) {
//     return { error: validatedFields.error };
//   }

//   //destructure data from validated fields
//   const { table_type, date, time_slot } = validatedFields.data;

//   //get available tables
//   const availableTables = await getAvailableTables({
//     date,
//     time_slot,
//     table_type: table_type as TableType,
//   });

  //other available tables
  // const otherAvailableTables = await getOtherAllTables({
  //   date,
  //   time_slot,
  //   table_type: table_type as TableType,
  // });

//   const error =
//     availableTables === null || availableTables.length === 0
//       ? `No ${table_type} tables available for the selected dates and time slots.`
//       : null;
//   const otherError =
//     otherAvailableTables === null || otherAvailableTables.length === 0
//       ? "No other tables available"
//       : null;

//       // if no tables available
//       return {
//         error:error,
//         otherError:otherError,
//         tables: availableTables,
//         other:otherAvailableTables,
//       };
// };

export const getTablesDetails = async () => {
  const tables = await getAllTables();

  return {
    tables,
  };
};

// create pending reservation for 15 minutes
// export const createPendingReservation = async (
//   tableNumber: number,
//   userId: number,
//   date: Date,
//   timeSlot: string,
// ) => {
//   // get cookies
//   const cookieStore = cookies();
//   // check if room number is valid
//   if (tableNumber === null) {
//     return {
//       error: "Invalid table number",
//     };
//   }

//   //check if dates are valid
//   if (date === null) {
//     return {
//       error: "Invalid date",
//     };
//   }

//   // get table from table number
//   const tableDetails = await getTableByNumber(tableId);

//   if (!tableDetails) {
//     return {
//       error: "Table not found",
//     };
//   }

//   // check if table is available or not
//   const tableAvailability = await checkTableAvailability(
//     tableDetails.id,
//     date,
//     timeSlot,
//   );

//   // check pending_reservation cookie if exists
//   const reservation = cookieStore.get("pending_reservation");

//   // get available offers
//   const offers = await getPromotions(1, 5, {
//     code: true,
//     description: true,
//     discount: true,
//   });

//   if (tableAvailability) {
//     // if reservation cookie not exists
//     if (!reservation) {
//       return {
//         error: "Table not available",
//       };
//     }
//     // check if reservation exists
//     const existingReservation = await getTableReservationById(reservation.value);
//     if (!existingReservation) {
//       return {
//         error: "Reservation not found",
//       };
//     }

//     // check reservation status
//     if (
//       existingReservation.status !== "Pending" &&
//       existingReservation.status !== "Ongoing"
//     ) {
//       return {
//         error: "Reservation already exists",
//       };
//     }

//     // check room numbers are mismatched
//     if (existingReservation.tableId !== tableDetails.id) {
//       return {
//         error: "Table numbers mismatch",
//       };
//     }

//     return {
//       success: true,
//       reservation: {
//         room: {
//           number: tableDetails.number,
//           type: tableDetails.type,
//         },
//         amount: existingReservation.total,
//         offers: offers?.offers || [],
//       },
//     };
//   } else {
//     // delete existing pending reservation
//     if (reservation) {
//       const existingReservation = await getTableReservationById(reservation.value);
//       if (existingReservation && existingReservation.status === "Pending")
//         await deleteTableReservation(reservation.value, "Pending");
//       if (existingReservation && existingReservation.status === "Ongoing")
//         await deleteTableReservation(reservation.value, "Ongoing");
//     }
    // calculate total amount
    // const totalAmount =
    //   tableDetails.price *
      // Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    // create new pending reservation
    // const newTableReservation = await createTableReservation({
    //   tableId: tableDetails.id,
    //   offerDiscount: 0,
    //   total: totalAmount,
    //   status: "Pending",
    //   type: "Online",
    // });

    // if (newTableReservation) {
    //   // Set a timeout to delete the record after 15 minutes
    //   setTimeout(
    //     async () => {
    //       await deleteTableReservation(newTableReservation.id, "Pending");
    //     },
    //     15 * 60 * 1000,
    //   );

      // set cookie for 15 minutes
      // cookies().set("pending_reservation", newTableReservation.id, {
      //   path: "/",
      //   secure: true,
      //   httpOnly: true,
      //   sameSite: "strict",
      //   expires: new Date(Date.now() + 15 * 60 * 1000),
      // });

      // return {
      //   success: true,
      //   reservation: {
      //     room: {
      //       number: tableDetails.number,
      //       type: tableDetails.type,
      //     },
      //     amount: newTableReservation.total,
      //     offers: offers?.offers || [],
      //   },
      // };
//     } else {
//       return {
//         error: "Table not available",
//       };
//     }
//   }
// };

// generate payment keys for pending reservation
// export const generatePaymentKeys = async (
//   values: z.infer<typeof TableReservationFormSchema>,
// ) => {
//   // get cookies
//   const cookieStore = cookies();
//   // validate data in backend
//   const validatedFields = TableReservationFormSchema.safeParse(values);

//   // check if validation failed and return errors
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.errors,
//     };
//   }

//   // destructure data from validated fields
//   const { name, email, phone, tableId, offerID } = validatedFields.data;

//   if (!email || !name || !phone) {
//     return {
//       error: "Invalid user details",
//     };
//   }

//   // check pending_reservation cookie if exists
//   const reservation = cookieStore.get("pending_reservation");

//   // if reservation cookie not exists
//   if (!reservation) {
//     return {
//       error: "Reservation not found",
//     };
//   }

//   // check if reservation exists
//   const existingReservation = await updateTableReservationStatus(
//     reservation.value,
//     "Ongoing",
//   );

//   if (!existingReservation) {
//     return {
//       error: "Reservation not found",
//     };
//   }

//   // extend cookie time for 15 minutes
//   cookieStore.set("pending_reservation", reservation.value, {
//     path: "/",
//     secure: true,
//     httpOnly: true,
//     sameSite: "strict",
//     expires: new Date(Date.now() + 15 * 60 * 1000),
//   });

//   // Set a timeout to delete the record after 15 minutes
//   setTimeout(
//     async () => {
//       await deleteTableReservation(existingReservation.id, "Ongoing");
//     },
//     15 * 60 * 1000,
//   );

//   // get promotion from code
//   let offerPercentage = 0;
//   let offer = null;
//   if (offerID) {
//     const promotion = await getPromotionByCode(offerID);
//     if (!promotion) {
//       return {
//         error: "Invalid promotion code",
//       };
//     }
//     offerPercentage = promotion.discount;
//     offer = promotion.id;
//   }

//   // get user by email
//   const user = await getUserByEmail(email);

//   // update reservation with user details
//   const updatedReservation = await updateTableReservation(
//     {
//       name,
//       email,
//       phone,
//       userId: user?.id,
//       offer,
//     },
//     offerPercentage,
//   );

//   // if update unsuccessful
//   if (!updatedReservation) {
//     return {
//       error: "Failed to make reservation",
//     };
//   }

//   // generate payment credentials and return
//   const hash = md5(
//     process.env.PAYHERE_MERCHANT_ID!! +
//       updatedReservation.reservationNo +
//       (updatedReservation.pendingBalance * 0.1).toFixed(2) +
//       "USD" +
//       md5(process.env.PAYHERE_SECRET!!).toUpperCase(),
//   ).toUpperCase();

//   return {
//     success: true,
//     payment: {
//       merchant_id: process.env.PAYHERE_MERCHANT_ID!!,
//       return_url: process.env.PAYHERE_RETURN_URL!!,
//       cancel_url: process.env.PAYHERE_CANCEL_URL!!,
//       notify_url: process.env.PAYHERE_NOTIFY_URL!!,
//       order_id: updatedReservation.reservationNo,
//       items: "Table Reservation - " + updatedReservation.reservationNo,
//       currency: "USD",
//       amount: (updatedReservation.pendingBalance * 0.1).toFixed(2),
//       first_name: name,
//       last_name: "",
//       email: email,
//       phone: phone,
//       address: "",
//       city: "",
//       country: "",
//       hash: hash,
//     },
//   };
// };

// // complete payment and update reservation status
// export const completePayment = async (order_id: number, payment: number) => {
//   // check if order_id is valid
//   if (!order_id) {
//     return {
//       error: "Invalid order id",
//     };
//   }

//   // get reservation by order_id
//   const reservation = await getTableReservationById(order_id);

//   // check if reservation exists
//   if (!reservation) {
//     return {
//       error: "Reservation not found",
//     };
//   }

//   // update reservation status
//   const updatedReservation = await confirmTableReservations(reservation.id, payment);

//   // if update unsuccessful
//   if (!updatedReservation) {
//     return {
//       error: "Failed to confirm reservation",
//     };
//   }

//   // add payment record to database
//   const paymentRecord = await addPaymentRecord(
//     updatedReservation.id,
//     payment,
//     "Online",
//   );

//   // if payment record not added
//   if (!paymentRecord) {
//     return {
//       error: "Failed to add payment record",
//     };
//   }

//   // remove pending_reservation cookie
//   cookies().delete("pending_reservation");

//   // calculate offer value
//   const offerValue =
//     (updatedReservation.total * (updatedReservation.offer?.discount || 0)) /
//     100;

//   // setup email template
//   const template = tableReservationConfirmEmailTemplate(
//     updatedReservation.name || "",
//     updatedReservation.reservationNo,
//     updatedReservation.time_slot,
//     updatedReservation.date,
//     updatedReservation.total.toFixed(2),
//     offerValue.toFixed(2),
//     payment.toFixed(2),
//     updatedReservation.pendingBalance.toFixed(2),
//     process.env.WEBSITE_URL +
//       "/view-reservations/" +
//       updatedReservation.reservationNo,
//     updatedReservation.table.type,
//     updatedReservation.table.number,
//   );

//   //get reply to email from env
//   const replyTo = process.env.CONTACT_US_EMAIL;

//   const isSend = await sendEmails({
//     to: updatedReservation.email!!,
//     replyTo,
//     subject: "Reservation Confirmation - The Villa Hotel",
//     body: template,
//   });

//   // if email not sent
//   if (!isSend) {
//     return {
//       error: "Order confirmed but email not sent",
//     };
//   }

//   return {
//     success: true,
//   };
// };
