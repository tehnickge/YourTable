-- DropForeignKey
ALTER TABLE "WorkSchedulePerDay" DROP CONSTRAINT "WorkSchedulePerDay_restaurantId_fkey";

-- AlterTable
ALTER TABLE "WorkSchedulePerDay" ALTER COLUMN "restaurantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkSchedulePerDay" ADD CONSTRAINT "WorkSchedulePerDay_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
