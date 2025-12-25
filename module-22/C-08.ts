/**
 * ============================================================
 * Prisma: Updating and Deleting Records — Step-by-Step Guide
 * ============================================================
 *
 * এই ফাইল দেখাবে:
 *  1) কিভাবে এক বা একাধিক record update করতে হয়
 *  2) কিভাবে এক বা একাধিক record delete করতে হয়
 *  3) কোন scenario তে কোন method ব্যবহার করা ভালো
 *
 * ============================================================
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /**
   * ----------------------------------------------------------------
   * 1) Updating a single record (update)
   * ----------------------------------------------------------------
   *
   * ধরো User model আছে:
   *   model User {
   *     id    Int    @id @default(autoincrement())
   *     name  String
   *     email String @unique
   *   }
   *
   * User এর name update করতে:
   */
  const updatedUser = await prisma.user.update({
    where: { id: 1 }, // কোন record update করতে হবে
    data: {
      name: "New Name", // নতুন value
    },
  });

  console.log("Updated User:", updatedUser);

  /**
   * ----------------------------------------------------------------
   * 2) Updating multiple records (updateMany)
   * ----------------------------------------------------------------
   *
   * যদি একাধিক user update করতে হয়:
   */
  const updateManyResult = await prisma.user.updateMany({
    where: { name: "Old Name" }, // মানে শুধুমাত্র সেই user গুলো যাদের name field এর value "Old Name" তাদের পরিবর্তন করবে।
    data: { name: "Updated Name" }, // নতুন value
  });

  console.log("Number of users updated:", updateManyResult.count);

  /**
   * ----------------------------------------------------------------
   * 3) Deleting a single record (delete)
   * ----------------------------------------------------------------
   *
   * User record delete করতে:
   */
  const deletedUser = await prisma.user.delete({
    where: { id: 2 },
  });

  console.log("Deleted User:", deletedUser);

  /**
   * ----------------------------------------------------------------
   * 4) Deleting multiple records (deleteMany)
   * ----------------------------------------------------------------
   *
   * একাধিক user delete করতে:
   */
  const deleteManyResult = await prisma.user.deleteMany({
    where: { name: "Test User" },
  });

  console.log("Number of users deleted:", deleteManyResult.count);
}

/**
 * ----------------------------------------------------------------
 * Note:
 * ----------------------------------------------------------------
 * - update() এবং delete() → single record, primary key বা unique field দিয়ে ব্যবহার করতে হবে
 * - updateMany() এবং deleteMany() → multiple records, condition অনুযায়ী কাজ করে
 * - কোন record match না হলে:
 *      - update() → error দিবে
 *      - delete() → error দিবে
 *      - updateMany()/deleteMany() → count = 0
 */
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
