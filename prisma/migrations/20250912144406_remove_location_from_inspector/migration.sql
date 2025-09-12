-- DropForeignKey
ALTER TABLE "public"."Inspector" DROP CONSTRAINT "Inspector_locationId_fkey";

-- AlterTable
ALTER TABLE "public"."Inspector" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Inspector" ADD CONSTRAINT "Inspector_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
