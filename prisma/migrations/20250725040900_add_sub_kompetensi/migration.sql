-- CreateTable
CREATE TABLE `sub_Kompetensis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(30) NOT NULL,
    `kode_job_family` VARCHAR(30) NOT NULL,
    `kode_sub_job_family` VARCHAR(30) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `desc` VARCHAR(250) NULL,
    `status` VARCHAR(20) NOT NULL,
    `kode_kompetensi` VARCHAR(30) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `sub_Kompetensis_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
