-- AlterTable
ALTER TABLE "User" ADD COLUMN     "csrfToken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "jwtToken" TEXT NOT NULL DEFAULT '';
