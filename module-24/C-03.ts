//  Fixing Authentication Errors & Implementing Email Verification
/*
1. APP_URL Environment Variable
Make sure that the APP_URL environment variable is correctly set in your .env file. This URL should match the base URL of your application.
APP_URL=http://localhost:3000
and when reqest from postman use the same URL and send origin header
Origin: http://localhost:3000

2. CORS Configuration 
If you're using a framework that requires CORS configuration, ensure that the trusted origins are set correctly in your Better Auth configuration.
trustedOrigins: [process.env.APP_URL!],
example:

import cors from 'cors';
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

3. Email Verification Setup
add the following configuration to your Better Auth setup:

emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
   emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
        * Implement your email sending logic here with nodemailer or any email service
        console.log(`Send verification email to ${user.email} with URL: ${url} and token: ${token}`);
    },
  },

  */
