-- CreateTable
CREATE TABLE `checklists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(30) NOT NULL,
    `urut` INTEGER NOT NULL,
    `desc` VARCHAR(100) NOT NULL,
    `kode` VARCHAR(30) NOT NULL,
    `group` VARCHAR(30) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `checklists_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
