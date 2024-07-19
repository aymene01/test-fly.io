-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MODO');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");
