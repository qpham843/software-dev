-- update article set published_date = null where published_date < 1587340800 or published_date > 1589932800;

ALTER TABLE article CHANGE COLUMN published_date published_date timestamp default CURRENT_TIMESTAMP;
ALTER TABLE article CHANGE COLUMN publish_date publish_date timestamp default CURRENT_TIMESTAMP;


DROP TABLE IF EXISTS `buzz_job`;
CREATE TABLE `buzz_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `finished` tinyint NOT NULL DEFAULT 0,
  `elapsed_seconds` int null default 0,
  `query` mediumtext default NULL,  
  `articles_returned` integer default 0,
  `articles_youtube` integer default 0,
  `articles_700` integer default 0,
  `articles_dropped` integer default 0,
  `articles_created` integer default 0,
  `articles_updated` integer default 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=969 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
