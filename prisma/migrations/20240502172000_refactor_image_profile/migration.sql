/*
  Warnings:

  - You are about to drop the column `imageProfileId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ImageProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_imageProfileId_fkey";

-- DropIndex
DROP INDEX "Profile_imageProfileId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "imageProfileId",
ADD COLUMN     "imageProfileKey" TEXT;

-- DropTable
DROP TABLE "ImageProfile";
