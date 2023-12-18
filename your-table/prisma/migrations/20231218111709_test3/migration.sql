-- AlterTable
ALTER TABLE "User" ADD COLUMN     "restaurantId" INTEGER;

-- CreateTable
CREATE TABLE "WorkSchedulePerDay" (
    "id" SERIAL NOT NULL,
    "timeBegin" TIME NOT NULL,
    "timeEnd" TIME NOT NULL,
    "dayId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "WorkSchedulePerDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Day_title_key" ON "Day"("title");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSchedulePerDay" ADD CONSTRAINT "WorkSchedulePerDay_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSchedulePerDay" ADD CONSTRAINT "WorkSchedulePerDay_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
