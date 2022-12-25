-- AlterTable
ALTER TABLE `sessions` RENAME COLUMN `createdAt` to `created_at`,
    RENAME COLUMN `updatedAt` to `updated_at`;

-- DropTable
DROP TABLE `Settings`;

-- CreateTable
CREATE TABLE `locations` (
    `name` VARCHAR(191) NOT NULL,
    `visit_counter` INTEGER NOT NULL DEFAULT 1,
    `last_visit_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `locations_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
