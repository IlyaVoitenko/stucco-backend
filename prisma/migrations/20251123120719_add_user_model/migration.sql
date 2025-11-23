/*
  Warnings:

  - You are about to drop the column `csrfToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jwtToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "csrfToken",
DROP COLUMN "jwtToken",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
