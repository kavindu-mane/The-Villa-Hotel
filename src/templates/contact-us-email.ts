export const contactUsEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Contact us Message</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #333;text-align: center;">The Villa Hotel!</h2>
         <p style="font-size: 16px; color: #444;">New Message from {{name}} ({{email}})</p>
        <p style="font-size: 16px; color: #444;margin-bottom:10px">
            {{message}}
        </p>
        <p style="font-size: 16px; color: #444;">
            Email generated from the The villa hotel system.
        </p>
    </div>
</body>
</html>`;