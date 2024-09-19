/*
  Warnings:

  - Changed the type of `number` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_number_key" ON "Card"("number");
