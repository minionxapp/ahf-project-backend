-- CreateTable
CREATE TABLE `divisi_depts` (
    `id` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(20) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `divisi_kode` VARCHAR(20) NOT NULL,
    `divisi_name` VARCHAR(100) NULL,
    `aktive` VARCHAR(20) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `divisi_depts_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
