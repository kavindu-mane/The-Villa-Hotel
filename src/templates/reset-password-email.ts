export const resetPasswordEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <p style="font-size: 16px; color: #333;">Hi {{userName}},</p>
        <h2 style="color: #444;text-align: center;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #333;">
            We received a request to reset your password for your account at The Villa Hotel. Click the button below to reset it.
        </p>
        <div style="text-align: center;margin-top:30px;margin-bottom:30px">
        <a href="{{resetLink}}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none;">
            Reset Password
        </a>
        </div>
        <p style="font-size: 16px; color: #333;">
            If you did not request a password reset, please ignore this email or contact support if you have any questions.
        </p>
        <p style="font-size: 16px; color: #333;">
            Best regards,<br>
            The Villa Hotel Team
        </p>
    </div>
</body>
</html>`;
