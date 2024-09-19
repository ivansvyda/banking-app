/*
  Warnings:

  - You are about to drop the column `number` on the `Card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardNumber]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardNumber` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Card_number_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "number",
ADD COLUMN     "cardNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_cardNumber_key" ON "Card"("cardNumber");
