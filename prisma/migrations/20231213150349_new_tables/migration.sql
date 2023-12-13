-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(30) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `blur_data` VARCHAR(1000) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `state` ENUM('Reading', 'Completed', 'Wish') NOT NULL DEFAULT 'Reading',
    `is_favorite` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boardgames` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `duration` VARCHAR(7) NOT NULL,
    `age` VARCHAR(5) NOT NULL,
    `players` VARCHAR(5) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `blur_data` VARCHAR(1000) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `state` ENUM('Own', 'Wishlist') NOT NULL DEFAULT 'Own',
    `tags` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
