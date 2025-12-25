/*
----------------------------------------------------
 MODEL (MAIN MODULE)
----------------------------------------------------

এই User model–এর ভেতরে প্রায় সব ধরনের Type,
constraint, relation এবং rule ব্যবহার করা হয়েছে।
এরপর প্রতিটি অংশ বিস্তারিত ব্যাখ্যাসহ দেওয়া হয়েছে।
*/
`
model User {
  // Primary Key with auto increment
  id        Int       @id @default(autoincrement())

  // Basic Text
  name      String

  // Unique Constraint
  email     String    @unique

  // String + Minimum column size
  password  String    @db.VarChar(200)

  // Enum + Default Value
  role      Role      @default(Customer)

  // Boolean with default
  isActive  Boolean   @default(true)

  // Decimal with specific precision
  balance   Decimal   @db.Decimal(10,2) @default(0.00)

  // Float example
  rating    Float?    @default(0)

  // JSON data
  metadata  Json?

  // DateTime
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Relation (One-to-Many)
  posts     Post[]

  // Composite Unique
  @@unique([email, name])

  // Rename actual table name in DB
  @@map("users_table")
}
`;

/*
----------------------------------------------------
   3) RELATED MODEL (Post)
----------------------------------------------------
একটি Post model তৈরি করা হয়েছে relation বোঝার জন্য।
*/
/*
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)

  // Foreign Key
  userId    Int

  // Relation
  user      User     @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())

  @@map("posts_table")
}

*/

/* 
====================================================
      NOW THE COMPLETE EXPLANATION STARTS  
====================================================

নীচে Prisma-র সব Type এবং সব Constraint 
সহজ ভাষায় বিস্তারিতভাবে ব্যাখ্যা করা হলো।
*/

/*
=====================================================
   PRISMA DATA TYPES – COMPLETE EXPLANATION
=====================================================
*/

/* 
===========================
   1) Int  
===========================
পূর্ণসংখ্যা রাখে।
Primary Key হিসেবে বেশি ব্যবহৃত।

উদাহরণ:
id Int @id @default(autoincrement())
*/

/*
===========================
   2) String  
===========================
টেক্সট রাখে।
নাম, ইমেইল, পাসওয়ার্ড ইত্যাদি।

উদাহরণ:
name String
*/

/*
===========================
   3) Boolean  
===========================
true / false মান রাখে।

উদাহরণ:
isActive Boolean @default(true)
*/

/*
===========================
   4) DateTime  
===========================
তারিখ ও সময় রাখে।

উদাহরণ:
createdAt DateTime @default(now())
*/

/*
===========================
   5) Float  
===========================
দশমিক সংখ্যা।

উদাহরণ:
rating Float
*/

/*
===========================
   6) Decimal  
===========================
উচ্চ-precision decimal।
টাকা বা সঠিক numeric হিসাবের জন্য আদর্শ।

উদাহরণ:
amount Decimal @db.Decimal(10,2)
*/

/*
===========================
   7) BigInt  
===========================
বড় Integer।
বড় indexed data এর জন্য।

উদাহরণ:
bigId BigInt
*/

/*
===========================
   8) Json  
===========================
JSON object বা array রাখতে পারে।

উদাহরণ:
metadata Json
*/

/*
===========================
   9) Enum  
===========================
নির্দিষ্ট fixed মানের তালিকা।

উদাহরণ:
enum Role {
  Admin
  Customer
}
*/

/*
=====================================================
   PRISMA CONSTRAINTS – COMPLETE EXPLANATION
=====================================================
*/

/*
===========================
   1) @id  
===========================
Primary Key সেট করে।

উদাহরণ:
id Int @id
*/

/*
===========================
   2) @default(...)  
===========================
Default মান সেট করে।

উদাহরণ:
name String @default("Unknown")
*/

/*
===========================
   3) @unique  
===========================
Field এর মান unique থাকবে।

উদাহরণ:
email String @unique
*/

/*
===========================
   4) @updatedAt  
===========================
Row update হলে স্বয়ংক্রিয়ভাবে DateTime আপডেট হয়।

উদাহরণ:
updatedAt DateTime @updatedAt
*/

/*
===========================
   5) @relation  
===========================
Table / Model এর মধ্যে Relation তৈরি করে।

উদাহরণ:
user User @relation(fields: [userId], references: [id])
*/

/*
===========================
   6) @map  
===========================
Field নাম Prisma-তে একরকম,
Database-এ আরেকরকম রাখতে সাহায্য করে।

উদাহরণ:
fullName String @map("full_name")
*/

/*
===========================
   7) @@map  
===========================
Model নাম Prisma-তে একরকম,
Database-এ টেবিল নাম আলাদা থাকে।

উদাহরণ:
@@map("users_table")
*/

/*
===========================
   8) @@unique  
===========================
Composite unique key (একাধিক field মিলে unique).

উদাহরণ:
@@unique([email, phone])
*/

/*
===========================
   9) @@id  
===========================
Composite primary key।

উদাহরণ:
@@id([userId, productId])
*/

/*
===========================
   10) @db.X  
===========================
Database-specific column type।

উদাহরণ:
price Decimal @db.Decimal(10, 2)
*/

/* 
====================================================
   SUMMARY – MOST IMPORTANT THINGS  
====================================================

MODEL বানানোর জন্য প্রয়োজনীয় Type:
✔ Int  
✔ String  
✔ Boolean  
✔ DateTime  
✔ Float  
✔ Decimal  
✔ Json  
✔ Enum  

Constraint গুলো:
✔ @id  
✔ @default  
✔ @unique  
✔ @relation  
✔ @@unique  
✔ @@id  
✔ @updatedAt  
✔ @map / @@map  

এই Type + Constraint ব্যবহার করেই Prisma-তে যেকোনো Module তৈরি করা হয়।
*/

// END OF FILE
