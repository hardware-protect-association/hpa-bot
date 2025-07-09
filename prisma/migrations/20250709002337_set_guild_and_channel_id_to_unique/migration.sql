/*
  Warnings:

  - A unique constraint covering the columns `[guildId]` on the table `greet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[channelId]` on the table `greet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "greet" ADD COLUMN "embed" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "greet_guildId_key" ON "greet"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "greet_channelId_key" ON "greet"("channelId");
