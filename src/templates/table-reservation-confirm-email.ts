import { foodsReservationDataTypes } from "@/types";

export const tableReservationConfirmEmailTemplate = (
  name: string,
  reservationId: number,
  date: string,
  timeSlot: string,
  totalAmount: string,
  offerAmount: string,
  coinAmount: string,
  subTotalAmount: string,
  reservationLink: string,
  tableType: string,
  tableNumber: string,
  tablePrice: string,
  foodDetails?: {
    foodId: string;
    quantity: number;
    total: number;
    food: {
      name: string;
    };
  }[],
) => {
  return `
    <!doctype html>
<html>
  <head>
    <title>Reservation Receipt</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto">
      <p style="font-size: 16px; color: #333">Hi ${name},</p>
      <h2 style="color: #444; text-align: center; font-size: 32px">
        Reservation Receipt
      </h2>
      <p style="font-size: 16px; color: #555; text-indent: 48px">
        Your reservation has been confirmed. Below are the details of your
        reservation. You can also view your reservation by clicking the button
        below. Please keep this email for your records. We look forward to your
        stay at Villa Hotel.
      </p>
      <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          margin-top: 30px;
          margin-bottom: 30px;
        "
      >
        <table style="margin-top: 20px; margin-bottom: 20px;width: 100%">
          <tr>
            <td style="font-size: 16px; color: #333; padding-right: 100px">
              Reservation ID:
            </td>
            <td style="font-size: 16px; color: #333; text-align: end">${reservationId}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Date:</td>
            <td style="font-size: 16px; color: #333; text-align: end">${date}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Time Slot:</td>
            <td style="font-size: 16px; color: #333; text-align: end">${timeSlot}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Table Type:</td>
            <td style="font-size: 16px; color: #333; text-align: end">${tableType.replaceAll("_", " ")}</td>
          </tr>
           <tr>
            <td style="font-size: 16px; color: #333">Table Number:</td>
            <td style="font-size: 16px; color: #333; text-align: end">${tableNumber}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Table Price:</td>
            <td style="font-size: 16px; color: #333; text-align: end">$${tablePrice}</td>
          </tr>
          ${
            foodDetails && foodDetails.length > 0
              ? `<tr>
            <td colspan="2">
              <h3 style="color: #444; text-align: center; font-size: 18px">
                Food Details
              </h3>

              <table style="margin-top: 20px; margin-bottom: 20px;width: 100%">
                <tr>
                  <td
                    style="font-size: 16px; color: #333;font-weight:600"
                  >
                    Food Name
                  </td>
                  <td
                    style="font-size: 16px; color: #333;font-weight:600"
                  >
                    Quantity
                  </td>
                  <td style="font-size: 16px; color: #333;text-align: end;font-weight:600">Price</td>
                </tr>
                ${foodDetails
                  .map((food) => {
                    return `<tr>
                    <td style="font-size: 16px; color: #333">${food.food.name}</td>
                    <td style="font-size: 16px; color: #333">${food.quantity}</td>
                    <td style="font-size: 16px; color: #333; text-align: end">$${food.total}</td>
                    </tr>`;
                  })
                  .join("")}
              </table>
            </td>
          </tr>`
              : "<tr></tr>"
          }
        </table>
      </div>
       <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          border-bottom: 1px solid #ddd;
        "
      >
        <table style="margin-bottom: 20px; margin-top: 20px; width: 100%">
         <tr>
            <td style="font-size: 16px; color: #333;font-weight:700">Total Amount:</td>
            <td style="font-size: 16px; color: #333;font-weight:700; text-align: end">
              $${totalAmount}
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333;font-weight:700">Coin Amount:</td>
            <td style="font-size: 16px; color: #333;font-weight:700; text-align: end">
              $${coinAmount}
            </td>
          </tr>
         <tr>
            <td style="font-size: 16px; color: #333;font-weight:700">Offer Amount:</td>
            <td style="font-size: 16px; color: #333;font-weight:700; text-align: end">
              $${offerAmount}
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333;font-weight:700">Sub Total:</td>
            <td style="font-size: 16px; color: #333;font-weight:700; text-align: end">
              $${subTotalAmount}
            </td>
          </tr>
        </table>
      </div>
      <div style="text-align: center; margin-top: 30px; margin-bottom: 30px">
        <a
          href="${reservationLink}"
          style="
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border: none;
          "
        >
          Go to Reservation
        </a>
      </div>
      <p style="font-size: 16px; color: #333">
        If you have any questions or need further assistance, please contact us
        at <a href="http://localhost:3000/contact-us">www.villahotel.com</a> or
        click the button above to go to your reservation.
      </p>
      <p style="font-size: 16px; color: #333">
        Best regards,<br />
        The Villa Hotel Team
      </p>
    </div>
  </body>
</html>
`;
};
