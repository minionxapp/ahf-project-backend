-- CreateTable
CREATE TABLE `table_cobas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NULL,
    `kode` VARCHAR(20) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `table_cobas_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
