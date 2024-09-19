/*
  Warnings:

  - The `balance` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "balance",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;
