-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `brands_kode_key`(`kode`),
    UNIQUE INDEX `brands_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
