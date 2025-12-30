// Inroduction to Email & Password Authentication (Better Auth Setup)
/*
1. Let's start by adding Better Auth to your project:
npm

npm install better-auth

2. Set Environment Variables 

2.1 Secret Key 
2.2 Set Base URL

3. Configure Database

auth.ts

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
* If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
  }, 
});

4. Create Database Tables
4.1 npx @better-auth/cli generate
4.2 npx prisma migrate dev --name "auth"

5. Integrate Better Auth with  Application
app.ts (or server.ts, index.ts, etc.)

import { toNodeHandler } from "better-auth/node";
app.all('/api/auth/{*any}', toNodeHandler(auth));



===== : /sign-up/email
     {
        name: "John Doe", // required
        email: "john.doe@example.com", // required
        password: "password1234", // required
        image: "https://example.com/image.png",
        callbackURL: "https://example.com/callback",
    }

    */
