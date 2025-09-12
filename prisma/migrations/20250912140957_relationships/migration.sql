/*
  Warnings:

  - The values [ACTIVE,INACTIVE] on the enum `StatusInspection` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,INACTIVE] on the enum `StatusLocation` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `inspectorId` to the `Inspection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Inspection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personaId` to the `Inspection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusInspection_new" AS ENUM ('AVALAIBLE', 'UNAVALAIBLE');
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" TYPE "public"."StatusInspection_new" USING ("status"::text::"public"."StatusInspection_new");
ALTER TYPE "public"."StatusInspection" RENAME TO "StatusInspection_old";
ALTER TYPE "public"."StatusInspection_new" RENAME TO "StatusInspection";
DROP TYPE "public"."StatusInspection_old";
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" SET DEFAULT 'AVALAIBLE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusLocation_new" AS ENUM ('AVALAIBLE', 'UNAVALAIBLE');
ALTER TABLE "public"."Location" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Location" ALTER COLUMN "status" TYPE "public"."StatusLocation_new" USING ("status"::text::"public"."StatusLocation_new");
ALTER TYPE "public"."StatusLocation" RENAME TO "StatusLocation_old";
ALTER TYPE "public"."StatusLocation_new" RENAME TO "StatusLocation";
DROP TYPE "public"."StatusLocation_old";
ALTER TABLE "public"."Location" ALTER COLUMN "status" SET DEFAULT 'AVALAIBLE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Inspection" ADD COLUMN     "inspectorId" INTEGER NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "personaId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'AVALAIBLE';

-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "status" SET DEFAULT 'AVALAIBLE';

-- CreateTable
CREATE TABLE "public"."Inspector" (
    "id" SERIAL NOT NULL,
    "personaId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspector_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Inspector" ADD CONSTRAINT "Inspector_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "public"."Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inspector" ADD CONSTRAINT "Inspector_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inspection" ADD CONSTRAINT "Inspection_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inspection" ADD CONSTRAINT "Inspection_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "public"."Inspector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inspection" ADD CONSTRAINT "Inspection_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "public"."Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
