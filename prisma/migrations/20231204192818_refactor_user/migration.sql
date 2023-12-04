/*
  Warnings:

  - You are about to drop the column `birthDate` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailConfirmed` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the column `termsAccepted` on the `TattooArtist` table. All the data in the column will be lost.
  - You are about to drop the `TattooClient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `TattooArtist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TattooArtist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `TattooArtistAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `TattooArtistAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TattooArtist_email_key";

-- AlterTable
ALTER TABLE "TattooArtist" DROP COLUMN "birthDate",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "isEmailConfirmed",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "termsAccepted",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TattooArtistAddress" ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL;

-- DropTable
DROP TABLE "TattooClient";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "tattooArtistId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TattooArtist_userId_key" ON "TattooArtist"("userId");

-- AddForeignKey
ALTER TABLE "TattooArtist" ADD CONSTRAINT "TattooArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
