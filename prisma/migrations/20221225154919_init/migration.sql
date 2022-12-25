-- CreateTable
CREATE TABLE `post_counters` (
    `slug` VARCHAR(191) NOT NULL,
    `views` BIGINT NOT NULL DEFAULT 0,
    `likes` BIGINT NOT NULL DEFAULT 0,
    `loves` BIGINT NOT NULL DEFAULT 0,
    `awards` BIGINT NOT NULL DEFAULT 0,
    `wows` BIGINT NOT NULL DEFAULT 0,

    UNIQUE INDEX `post_counters_slug_key`(`slug`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `likes` BOOLEAN NOT NULL DEFAULT false,
    `loves` BOOLEAN NOT NULL DEFAULT false,
    `awards` BOOLEAN NOT NULL DEFAULT false,
    `wows` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sessions_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
