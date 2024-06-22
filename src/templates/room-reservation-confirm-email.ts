export const roomReservationConfirmEmailTemplate = (
  name: string,
  reservationId: number,
  checkInDate: string,
  checkOutDate: string,
  totalAmount: string,
  offerAmount: string,
  paidAmount: string,
  pendingAmount: string,
  reservationLink: string,
  roomType: string,
  roomNumber: number,
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
        <table style="margin-top: 20px; margin-bottom: 20px">
          <tr>
            <td style="font-size: 16px; color: #333; padding-right: 100px">
              Reservation ID:
            </td>
            <td style="font-size: 16px; color: #333">${reservationId}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Check-in Date:</td>
            <td style="font-size: 16px; color: #333">${checkInDate}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Check-out Date:</td>
            <td style="font-size: 16px; color: #333">${checkOutDate}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Room Type:</td>
            <td style="font-size: 16px; color: #333">${roomType}</td>
          </tr>
           <tr>
            <td style="font-size: 16px; color: #333">Room Number:</td>
            <td style="font-size: 16px; color: #333">${roomNumber}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Total Amount:</td>
            <td style="font-size: 16px; color: #333">$${totalAmount}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Offer Amount:</td>
            <td style="font-size: 16px; color: #333">$${offerAmount}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333">Payed Amount:</td>
            <td style="font-size: 16px; color: #333">$${paidAmount}</td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #111">Pending Amount:</td>
            <td style="font-size: 16px; color: #111">$${pendingAmount}</td>
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
