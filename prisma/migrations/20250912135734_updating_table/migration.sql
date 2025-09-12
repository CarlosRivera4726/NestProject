/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PersonaRol" AS ENUM ('ADMIN', 'PERSONA', 'INSPECTOR', 'DEVELOPER', 'VIEWER');

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."UserRol";

-- CreateTable
CREATE TABLE "public"."Persona" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."PersonaRol" NOT NULL DEFAULT 'DEVELOPER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "public"."Persona"("email");
