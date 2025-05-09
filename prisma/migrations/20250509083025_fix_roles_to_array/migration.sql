/*
  Warnings:

  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ValidRoles" AS ENUM ('admin', 'superUser', 'user');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles",
ADD COLUMN     "roles" "ValidRoles"[] DEFAULT ARRAY[]::"ValidRoles"[];
