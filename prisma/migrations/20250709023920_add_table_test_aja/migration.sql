-- CreateTable
CREATE TABLE `test_ajas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `textaja` VARCHAR(3) NULL,
    `numberaja` INTEGER NOT NULL,
    `tglaja` DATETIME(3) NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
