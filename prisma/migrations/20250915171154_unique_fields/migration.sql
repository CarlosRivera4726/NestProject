/*
  Warnings:

  - A unique constraint covering the columns `[personaId]` on the table `Administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personaId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Administrador_personaId_key" ON "public"."Administrador"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_personaId_key" ON "public"."Usuario"("personaId");
