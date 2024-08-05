export const reservationCancellationTemplate = (code: string, name: string) => {
  return `
<!doctype html>
<html>
  <head>
    <title>Reservation Cancellation</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto">
      <h2 style="color: #333; text-align: center">Reservation Cancellation</h2>
      <p style="font-size: 16px; color: #444">Hi ${name},</p>
      <p style="font-size: 16px; color: #444; margin-bottom: 10px">
        Please use this code to cancel your reservation:
        <strong>${code}</strong>
      </p>
       <p style="font-size: 16px; color: #444; margin-bottom: 10px">
        Please note that this code is valid for 30 minutes.
       </p>
      <p style="font-size: 16px; color: #444">
        If you have any questions, feel free to contact us at
        <a href="mailto:contact@thevillahotel.com"> this email address. </a>
      </p>
      <p style="font-size: 16px; color: #444">
        Best regards,<br />
        The Villa Hotel Team
      </p>
    </div>
  </body>
</html>
`;
};
