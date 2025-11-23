/*
  Warnings:

  - You are about to drop the column `height` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `meters` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('BY_METER', 'BY_ITEM');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "height",
DROP COLUMN "meters",
DROP COLUMN "weight",
ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "SizeProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "meterPrice" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "itemPrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SizeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jwtToken" TEXT,
    "csrfToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SizeProduct" ADD CONSTRAINT "SizeProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
