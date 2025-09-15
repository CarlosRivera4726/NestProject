/*
  Warnings:

  - A unique constraint covering the columns `[personaId]` on the table `Inspector` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Inspector" DROP CONSTRAINT "Inspector_locationId_fkey";

-- AlterTable
ALTER TABLE "public"."Inspector" ALTER COLUMN "locationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inspector_personaId_key" ON "public"."Inspector"("personaId");

-- AddForeignKey
ALTER TABLE "public"."Inspector" ADD CONSTRAINT "Inspector_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
