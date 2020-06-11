DROP TABLE IF EXISTS `update_job`;
CREATE TABLE `update_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `finished` tinyint NOT NULL DEFAULT 0,
  `elapsed_seconds` int null default 0,
  `articles_buzz` integer default 0,
  `articles_user` integer default 0,
  `articles_updated` integer default 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=969 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
