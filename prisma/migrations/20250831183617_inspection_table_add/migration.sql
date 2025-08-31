/*
  Warnings:

  - Added the required column `coordinates` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StatusInspection" AS ENUM ('ACTIVE', 'AVALAIBLE', 'INACTIVE', 'UNAVALAIBLE');

-- AlterTable
ALTER TABLE "public"."Location" ADD COLUMN     "coordinates" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Inspection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."StatusInspection" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);
