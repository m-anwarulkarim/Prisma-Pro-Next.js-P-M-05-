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
