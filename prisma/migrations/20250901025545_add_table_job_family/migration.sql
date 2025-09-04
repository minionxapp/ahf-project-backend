-- CreateTable
CREATE TABLE `job_familys` (
    `id` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(30) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `aktive` VARCHAR(30) NOT NULL,
    `deskripsi` VARCHAR(250) NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `job_familys_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
