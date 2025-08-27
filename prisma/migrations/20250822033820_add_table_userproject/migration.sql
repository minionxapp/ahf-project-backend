-- CreateTable
CREATE TABLE `user_projects` (
    `id` VARCHAR(191) NOT NULL,
    `project_id` INTEGER NOT NULL,
    `username` VARCHAR(100) NULL,
    `status` VARCHAR(20) NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
