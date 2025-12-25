/*
----------------------------------------------------
  1) ENUM DEFINITIONS
----------------------------------------------------

Enum = নির্দিষ্ট মানের তালিকা (fixed set of values)।
Prisma model-এ enum ব্যবহার করে field value শুধু allowed values রাখে।
*/

`enum Role {
  Admin
  Customer
  Manager
}`;

`enum Status {
  Active
  Inactive
  Pending
}
`;
/*
ব্যাখ্যা:
- Role: ব্যবহারকারীর ভূমিকা (Admin, Customer, Manager)
- Status: অবস্থা বোঝায় (Active, Inactive, Pending)
- Enum field default মানও সেট করা যায়
*/

/*
====================================================
     PRISMA RELATIONS – FULL DETAILED GUIDE
====================================================

এই ফাইলটি Prisma-তে Relation বুঝার জন্য
TypeScript ফাইল আকারে সাজানো হয়েছে।

সব ব্যাখ্যা comment আকারে দেওয়া আছে,
কোনো কার্যকর কোড হিসেবে রান হবে না,
শুধু পড়ার এবং বোঝার জন্য।
*/

/*
----------------------------------------------------
  TYPES OF RELATIONS IN PRISMA
----------------------------------------------------

1) One-to-One (1 → 1)
2) One-to-Many (1 → many)
3) Many-to-Many (many → many)
*/

// ===============================
// 1) One-to-One Relation (1 → 1)
// ===============================

// Concept:
// একটি টেবিলের প্রতিটি রেকর্ড শুধুমাত্র একবার অন্য টেবিলের রেকর্ডের সাথে যুক্ত থাকে।
// অর্থাৎ, একজন User-এর ঠিক একটিমাত্র Profile থাকতে পারে,
// এবং Profile-ও ঠিক এক User-এর সাথে যুক্ত থাকে.

// -------------------------------
// Prisma Schema Equivalent
// -------------------------------

`model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  profile  Profile?    // Optional: User এর Profile থাকতে পারে, না থাকতেও পারে
}
`;

`model Profile {
  id       Int      @id @default(autoincrement())
  bio      String?
  userId   Int      @unique   // Foreign key, প্রতিটি Profile শুধু এক User এর সাথে যুক্ত
  user     User     @relation(fields: [userId], references: [id])
}

`;
// -------------------------------
// Step by Step ব্যাখ্যা
// -------------------------------

// 1️⃣ User মডেল
// - id → Primary Key
// - email → Unique field
// - profile → Optional, কোনো User-এর Profile থাকতে পারে বা না-ও থাকতে পারে

// 2️⃣ Profile মডেল
// - id → Primary Key
// - bio → Optional string
// - userId → Foreign Key (User-এর id নির্দেশ করে)
// - @unique নিশ্চিত করে প্রতিটি Profile শুধুমাত্র এক User এর সাথে যুক্ত

// 3️⃣ Relation
// - user: User field দেখায় যে প্রতিটি Profile ঠিক এক User এর সাথে যুক্ত
// - TypeScript-এ এটি একধরনের object reference হিসেবে কাজ করে

// ===============================
// 2) One-to-Many Relation (1 → many)
// ===============================

// Concept:
// একটি রেকর্ডের সাথে অনেকগুলো রেকর্ড যুক্ত থাকে।
// অর্থাৎ, একজন User-এর অনেক Post থাকতে পারে,
// কিন্তু প্রতিটি Post ঠিক এক User এর সাথে যুক্ত থাকে।

// -------------------------------
// Prisma Schema Equivalent
// -------------------------------

`model User {
  id     Int     @id @default(autoincrement())
  email  String  @unique
  posts  Post[]   // One-to-Many relation: একজন User-এর অনেক Post
}`;

`model Post {
  id       Int     @id @default(autoincrement())
  title    String
  userId   Int
  user     User    @relation(fields: [userId], references: [id])
}
`;

// -------------------------------
// Step by Step ব্যাখ্যা
// -------------------------------

// 1️⃣ User মডেল
// - id → Primary Key
// - posts → Post[] এর মাধ্যমে One-to-Many relation দেখানো হয়েছে
//   অর্থাৎ, একজন User-এর অনেক Post থাকতে পারে

// 2️⃣ Post মডেল
// - userId → Foreign Key যা User এর id নির্দেশ করে
// - user → Relation দেখায় যে প্রতিটি Post ঠিক এক User এর সাথে যুক্ত

// 3️⃣ @relation
// - @relation(fields: [userId], references: [id]) Prisma কে বলে:
//   userId ফিল্ডটি User এর id কে রেফার করছে
// - One-to-Many relation-এ foreign key সবসময় "many" পাশে থাকে

// ===============================
// 3) Many-to-Many Relation (many → many)
// ===============================

// Concept:
// দুই Model-এর অনেকগুলো রেকর্ড একে অপরের সাথে যুক্ত হতে পারে।
// উদাহরণ: Student ↔ Course
// অর্থাৎ, একজন Student অনেক Course করতে পারে,
// এবং একটি Course অনেক Student এর সাথে যুক্ত হতে পারে।

// -------------------------------
// Prisma Schema Equivalent (Implicit Many-to-Many)
// -------------------------------

`model Student {
  id      Int       @id @default(autoincrement())
  name    String
  courses Course[]   // Implicit Many-to-Many relation
}`;

`model Course {
  id       Int       @id @default(autoincrement())
  title    String
  students Student[] // Implicit Many-to-Many relation
}
`;

// -------------------------------
// ব্যাখ্যা (Implicit Many-to-Many)
// -------------------------------
// - Prisma নিজেই junction table তৈরি করে (যেমন: StudentToCourse)
// - Junction table-এ studentId ও courseId থাকে
// - Implicit relation → junction table automatic
// - কোন extra column লাগলে implicit ব্যবহার করা যায় না, explicit করতে হবে

// -------------------------------
// Explicit Many-to-Many (Junction Table নিজে তৈরি করা)
// -------------------------------

`model Enrollment {
  id        Int      @id @default(autoincrement())
  studentId Int
  courseId  Int
  date      DateTime @default(now())

  student   Student @relation(fields: [studentId], references: [id])
  course    Course  @relation(fields: [courseId], references: [id])

  @@unique([studentId, courseId])
}
`;

// -------------------------------
// ব্যাখ্যা (Explicit Many-to-Many)
// -------------------------------
// 1️⃣ Junction Table: Enrollment তৈরি করা হয়েছে
// 2️⃣ Foreign Keys: studentId & courseId
// 3️⃣ Extra column (date) রাখা হয়েছে, যা implicit relation এ সম্ভব নয়
// 4️⃣ @@unique([studentId, courseId]) → একই student একই course-এ দুইবার ভর্তি না হতে পারে

/*
====================================================
DIAGRAM SUMMARY
====================================================

1) One-to-One:
User (1) —— (1) Profile

2) One-to-Many:
User (1) —— (*) Post

3) Many-to-Many:
Student (*) —— (*) Course
*/
/*
====================================================
       PRISMA RELATIONS DIAGRAM – ASCII GUIDE
====================================================

এই diagram-এ দেখানো হলো:
1) One-to-One Relation
2) One-to-Many Relation
3) Many-to-Many Relation

সকল table name, primary key (PK), foreign key (FK)
এবং সম্পর্কের direction দেখানো হয়েছে।
*/

/*
----------------------------------------------------
1) ONE-TO-ONE (User ↔ Profile)
----------------------------------------------------

User Table
+-----------+---------+
| Column    | Type    |
+-----------+---------+
| id (PK)   | Int     |
| email     | String  |
| role      | Enum    |
+-----------+---------+

Profile Table
+-----------+---------+
| Column    | Type    |
+-----------+---------+
| id (PK)   | Int     |
| bio       | String  |
| userId(FK)| Int     |
+-----------+---------+

Diagram:
User (1) —— (1) Profile
id ------------> userId (foreign key)
*/

/*
----------------------------------------------------
2) ONE-TO-MANY (User ↔ Post)
----------------------------------------------------

User Table
+-----------+---------+
| Column    | Type    |
+-----------+---------+
| id (PK)   | Int     |
| email     | String  |
+-----------+---------+

Post Table
+-----------+---------+
| Column    | Type    |
+-----------+---------+
| id (PK)   | Int     |
| title     | String  |
| userId(FK)| Int     |
+-----------+---------+

Diagram:
User (1) —— (*) Post
id ------------> userId (foreign key)
*/

/*
----------------------------------------------------
3) MANY-TO-MANY (Student ↔ Course)
----------------------------------------------------

Student Table
+-----------+---------+
| Column    | Type    |
+-----------+---------+
| id (PK)   | Int     |
| name      | String  |
+-----------+---------+

Course Table
+-----------+---------+
| Column    | Type    |
+-----------+---------+
| id (PK)   | Int     |
| title     | String  |
+-----------+---------+

Junction Table: Enrollment
+------------+---------+
| Column     | Type    |
+------------+---------+
| id (PK)    | Int     |
| studentId  | Int FK  |
| courseId   | Int FK  |
+------------+---------+

Diagram:
Student (*) —— (*) Course
   \           /
    \         /
     \       /
     Enrollment (junction table)
*/

/*
====================================================
Notes:
- PK = Primary Key
- FK = Foreign Key
- One-to-One: foreign key @unique
- One-to-Many: foreign key on "many" side
- Many-to-Many: junction table with two foreign keys
====================================================
*/
