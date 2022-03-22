DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(20) default "",
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `article_has_tag`;
CREATE TABLE `article_has_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4543 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

drop view if exists `article_tag_view`;
CREATE VIEW `article_tag_view` AS 
select 
    `t`.`id` as `article_has_tag_id`,
    `t`.`tag` AS `tag` ,
    `aht`.`article_id` as `article_id`
from 
	(`article_has_tag` `aht` join `tag` `t`) 
where 
	(`aht`.`tag_id` = `t`.`id`) 
order by 
	`t`.`tag` desc ;
    
DROP TABLE IF EXISTS `buzz_query`;
CREATE TABLE `buzz_query` (
  `id` int NOT NULL AUTO_INCREMENT,
  `query` text default null,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4325 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `query_has_tag`;
CREATE TABLE `query_has_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_id` int NOT NULL,
  `query_id` int NOT NULL,
  `tag` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

drop view if exists `query_tag_view`;
CREATE VIEW `query_tag_view` AS 
select 
    `qht`.`id` as `id`,
    `t`.`tag` AS `tag` ,
    `qht`.`query_id` as `query_id`
from 
	(`query_has_tag` `qht` join `tag` `t`) 
where 
	(`qht`.`tag_id` = `t`.`id`) 
order by 
	`t`.`tag` desc ;

-- drop view if exists `article_current_status`;
-- drop view if exists `article_sub_status_view`;