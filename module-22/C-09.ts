/**
 * ============================================================
 * Prisma: Upsert
 * ============================================================
 *
 * এই ফাইল দেখাবে:
 *  1) Upsert (Update if exists, else create
 *  2) Update single/multiple records
 *  3) Delete single/multiple records
 *  4) Nested Upsert for relations
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /**
   * ----------------------------------------------------------------
   * 1) UPSERT: Update if exists, else create
   * ----------------------------------------------------------------
   * ধরো User model:
   *   model User {
   *     id    Int    @id @default(autoincrement())
   *     name  String
   *     email String @unique
   *   }
   */
  const upsertUser = await prisma.user.upsert({
    where: { email: "karim@example.com" }, // check unique field
    update: {
      name: "Karim Updated", // যদি record থাকে → update
    },
    create: {
      name: "Karim New", // যদি record না থাকে → create
      email: "karim@example.com",
    },
  });

  console.log("Upserted User:", upsertUser);

  /**
   * ----------------------------------------------------------------
   * 2) Nested UPSERT with relation
   * ----------------------------------------------------------------
   * ধরো User → Post relation আছে:
   *   model Post {
   *     id       Int    @id @default(autoincrement())
   *     title    String
   *     content  String
   *     authorId Int
   *     author   User   @relation(fields: [authorId], references: [id])
   *   }
   */
  const nestedUpsert = await prisma.user.upsert({
    where: { email: "karim@example.com" },
    update: {
      name: "Karim Updated Again",
      posts: {
        create: { title: "New Post", content: "Hello World!" }, // add post
      },
    },
    create: {
      name: "Karim New User",
      email: "karim@example.com",
      posts: {
        create: { title: "First Post", content: "Welcome!" }, // create user + post
      },
    },
  });

  console.log("Nested Upsert:", nestedUpsert);

  /**
   * ----------------------------------------------------------------
   * Notes:
   * ----------------------------------------------------------------
   * - upsert → check করে, update বা create করে
   * - update/delete → single record, primary key বা unique field ব্যবহার করা দরকার
   * - updateMany/deleteMany → multiple records, condition অনুযায়ী
   * - nested relation সহ upsert → parent + relation একসাথে create/update করা যায়
   */
  main()
    .catch((e) => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });
}
