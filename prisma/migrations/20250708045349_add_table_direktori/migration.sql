/*
  Warnings:

  - You are about to drop the column `direktori` on the `dev_direktoris` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dev_direktoris` DROP COLUMN `direktori`,
    ADD COLUMN `backend` VARCHAR(250) NULL,
    ADD COLUMN `frontend` VARCHAR(250) NULL;
