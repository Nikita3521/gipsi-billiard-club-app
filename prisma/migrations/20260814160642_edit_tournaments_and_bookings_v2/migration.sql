/*
  Warnings:

  - Added the required column `date` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryFee` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxParticipants` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prize` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "entryFee" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "maxParticipants" INTEGER NOT NULL,
ADD COLUMN     "prize" TEXT NOT NULL,
ADD COLUMN     "rules" TEXT[],
ADD COLUMN     "time" TEXT NOT NULL;
