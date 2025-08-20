-- AlterTable
ALTER TABLE `users` MODIFY `create_by` VARCHAR(20) NOT NULL DEFAULT 'admin';

-- CreateTable
CREATE TABLE `user_akademis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `kode_akademi` VARCHAR(30) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
