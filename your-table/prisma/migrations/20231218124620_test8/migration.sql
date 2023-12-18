/*
  Warnings:

  - You are about to drop the column `rentId` on the `Slot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_rentId_fkey";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "rentId";

-- CreateTable
CREATE TABLE "SlotsRents" (
    "id" SERIAL NOT NULL,
    "slotId" INTEGER NOT NULL,
    "rentId" INTEGER NOT NULL,

    CONSTRAINT "SlotsRents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SlotsRents" ADD CONSTRAINT "SlotsRents_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotsRents" ADD CONSTRAINT "SlotsRents_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
