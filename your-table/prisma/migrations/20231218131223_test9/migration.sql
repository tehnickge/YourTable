-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "info" TEXT,
ADD COLUMN     "shortInfo" TEXT;

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "restaurantId" INTEGER,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
