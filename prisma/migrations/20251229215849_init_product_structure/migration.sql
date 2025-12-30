/*
  Warnings:

  - You are about to drop the column `dimensions` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `meterPrice` on the `SizeProduct` table. All the data in the column will be lost.
  - Added the required column `hasDepth` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDiameter` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHeight` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasWidth` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "hasDepth" BOOLEAN NOT NULL,
ADD COLUMN     "hasDiameter" BOOLEAN NOT NULL,
ADD COLUMN     "hasHeight" BOOLEAN NOT NULL,
ADD COLUMN     "hasWidth" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "dimensions";

-- AlterTable
ALTER TABLE "SizeProduct" DROP COLUMN "meterPrice",
ADD COLUMN     "depth" DOUBLE PRECISION,
ADD COLUMN     "diameter" DOUBLE PRECISION;
