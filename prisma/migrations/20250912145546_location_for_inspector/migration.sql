/*
  Warnings:

  - Made the column `locationId` on table `Inspector` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Inspector" DROP CONSTRAINT "Inspector_locationId_fkey";

-- AlterTable
ALTER TABLE "public"."Inspector" ALTER COLUMN "locationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Inspector" ADD CONSTRAINT "Inspector_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
