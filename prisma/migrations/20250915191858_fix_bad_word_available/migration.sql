/*
  Warnings:

  - The values [AVALAIBLE,UNAVALAIBLE] on the enum `StatusInspection` will be removed. If these variants are still used in the database, this will fail.
  - The values [AVALAIBLE,UNAVALAIBLE] on the enum `StatusLocation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusInspection_new" AS ENUM ('AVAILABLE', 'UNAVAILABLE');
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" TYPE "public"."StatusInspection_new" USING ("status"::text::"public"."StatusInspection_new");
ALTER TYPE "public"."StatusInspection" RENAME TO "StatusInspection_old";
ALTER TYPE "public"."StatusInspection_new" RENAME TO "StatusInspection";
DROP TYPE "public"."StatusInspection_old";
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusLocation_new" AS ENUM ('AVAILABLE', 'UNAVAILABLE');
ALTER TABLE "public"."Location" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Location" ALTER COLUMN "status" TYPE "public"."StatusLocation_new" USING ("status"::text::"public"."StatusLocation_new");
ALTER TYPE "public"."StatusLocation" RENAME TO "StatusLocation_old";
ALTER TYPE "public"."StatusLocation_new" RENAME TO "StatusLocation";
DROP TYPE "public"."StatusLocation_old";
ALTER TABLE "public"."Location" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Inspection" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "public"."Location" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
