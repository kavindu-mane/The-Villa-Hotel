export const verificationEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #333;text-align: center;">Welcome to The Villa Hotel!</h2>
         <p style="font-size: 16px; color: #444;">Hi {{userName}},</p>
        <p style="font-size: 16px; color: #444;margin-bottom:10px">
            We're excited to have you on board. To get started, please verify your email address.
        </p>
        <div style="text-align: center;margin-top:30px;margin-bottom:30px">
            <a href="{{verificationLink}}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none;">
                Verify Email
            </a>
        </div>
        <p style="font-size: 16px; color: #444;">
            If you did not sign up for an account at The Villa Hotel, please ignore this email.
        </p>
        <p style="font-size: 16px; color: #444;">
            Best regards,<br>
            The Villa Hotel Team
        </p>
    </div>
</body>
</html>`;
