-- CreateTable
CREATE TABLE `trainings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(30) NOT NULL,
    `nama` VARCHAR(250) NULL,
    `akademi` VARCHAR(100) NULL,
    `tipe` VARCHAR(100) NULL,
    `pic` VARCHAR(30) NULL,
    `desc` VARCHAR(30) NULL,
    `kompetensi` VARCHAR(250) NULL,
    `tgl_mulai` DATETIME(3) NULL,
    `tgl_akhir` DATETIME(3) NULL,
    `sub_kompetensi` VARCHAR(100) NULL,
    `status_training` VARCHAR(30) NULL,
    `kode_job_family` VARCHAR(30) NOT NULL,
    `kode_sub_job_family` VARCHAR(30) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `trainings_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
