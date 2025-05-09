/*
  Warnings:

  - Changed the type of `status` on the `Friendship` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FRIENDSHIPSTATUS" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "status",
ADD COLUMN     "status" "FRIENDSHIPSTATUS" NOT NULL;

-- DropEnum
DROP TYPE "FriendshipStatus";
