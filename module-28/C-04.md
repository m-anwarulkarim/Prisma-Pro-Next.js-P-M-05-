// Email Verification System – Part 1 (Token & Flow Design)
/*
1. npm i nodemailer

2. add in auth.ts file  

import nodemailer from "nodemailer";

 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER!,
    pass: process.env.APP_PASS!,
  },
});

add in sendVerificationEmail function:

 const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
 emailVerification: tree,
 
    sendVerificationEmail: async ( { user, url, token }, request) => {
    try {const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: user.email,
    subject: "Please verify your email!",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>

  <body
    style="
      background-color: #f5f7fa;
      font-family: Arial, sans-serif;
      padding: 0;
      margin: 0;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);"
    >
      <tr>
        <td style="padding: 40px; text-align: center;">
          <h2 style="color: #333; margin-bottom: 20px;">
            Verify Your Email Address
          </h2>

          <p style="color: #555; font-size: 15px; line-height: 22px;">
            Hi ${user.name},<br />
            Please verify your email address so you can complete your account
            setup. Just click the button below:
          </p>

          <a
            href="${verificationUrl}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #4f46e5;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 25px;
              font-size: 16px;
            "
          >
            Verify Email
          </a>

          <p
            style="color: #777; font-size: 13px; margin-top: 30px; line-height: 20px;"
          >
            If the button above doesn’t work, copy and paste this link into your
            browser:
          </p>

          <p
            style="word-break: break-all; color: #4a4a4a; font-size: 12px; margin-top: 5px;"
          >
            ${verificationUrl}
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`, // HTML version of the message
  });
    console.log("Message sent:", info.messageId);
    } catch (error) {
    console.error("Error sending verification email:", error);
    }
    },*/
