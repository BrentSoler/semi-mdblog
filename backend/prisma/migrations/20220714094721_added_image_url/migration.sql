/*
  Warnings:

  - Added the required column `image_key` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image_key" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
