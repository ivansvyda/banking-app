/*
  Warnings:

  - Added the required column `CVV` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresIn` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "CVV" TEXT NOT NULL,
ADD COLUMN     "expiresIn" TEXT NOT NULL;
