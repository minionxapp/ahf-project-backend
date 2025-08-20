-- CreateTable
CREATE TABLE `training_checklists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `training_kode` VARCHAR(100) NOT NULL,
    `checklist_kode` VARCHAR(100) NOT NULL,
    `file_1` VARCHAR(100) NULL,
    `file_2` VARCHAR(100) NULL,
    `file_3` VARCHAR(100) NULL,
    `file_4` VARCHAR(100) NULL,
    `status` VARCHAR(30) NULL,
    `checklist_name` VARCHAR(100) NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
