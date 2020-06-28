
DROP VIEW IF EXISTS `article_status_view`;
CREATE VIEW `article_status_view` AS select `ahs`.`id` AS `id`,`ahs`.`article_id` AS `article_id`,`ahs`.`date_changed` AS `date_changed`,`ahs`.`comment` AS `comment`,`ast`.`status_code` AS `status_code`,`ast`.`status_text` AS `status_text` from (`article_has_status` `ahs` join `article_status` `ast`) where (`ahs`.`article_status_id` = `ast`.`id`) order by `ahs`.`id` desc ;

DROP VIEW IF EXISTS `article_sub_status_view`;
CREATE VIEW `article_sub_status_view` AS select `article_has_status`.`article_id` AS `article_id`,max(`article_has_status`.`date_changed`) AS `MaxDateTime` from `article_has_status` group by `article_has_status`.`article_id`;

DROP VIEW IF EXISTS `article_current_status`;
CREATE VIEW `article_current_status` AS select `a`.`id` AS `id`,`a`.`title` AS `title`,`a`.`author` AS `author`,`a`.`url` AS `url`,`a`.`publish_date` AS `publish_date`,`a`.`article_text` AS `article_text`,`st`.`status_code` AS `status_code` from (((`article` `a` join `article_has_status` `ahs`) join `article_status` `st`) join `article_sub_status_view` `assv`) where ((`ahs`.`article_id` = `assv`.`article_id`) and (`ahs`.`date_changed` = `assv`.`MaxDateTime`) and (`a`.`id` = `assv`.`article_id`) and (`st`.`id` = `ahs`.`article_status_id`)) ;

-- Dump completed on 2020-03-15 17:54:45
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

DROP TABLE IF EXISTS `s3_job`;
CREATE TABLE `s3_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `finished` tinyint NOT NULL DEFAULT 0,
  `elapsed_seconds` int null default 0,
  `articles_to_send` integer default 0,
  `articles_sent` integer default 0,
  `articles` mediumtext default null,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=969 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(20) default "",
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

DROP TABLE IF EXISTS `update_job`;
CREATE TABLE `update_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `finished` tinyint NOT NULL DEFAULT 0,
  `elapsed_seconds` int null default 0,
  `articles_buzz` integer default 0,
  `articles_user` integer default 0,
  `articles_updated` integer default 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=969 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


alter table buzz_query
add column
  filename_tag varchar(20) null;

alter table buzz_query
add column
    active_flag boolean;

insert into buzz_query 
(id, query, filename_tag, active_flag) 
values 
(1, 'topic=coronavirus,covid&search_type=trending_now&hours=24&count=25&countries=United States', 'CovidArticles',true),
(2, 'topic=Black Lives Matter,BLM&search_type=trending_now&hours=24&count=25&countries=United States', 'BLMArticles',true),
(3, 'topic=Election 2020,US Election,Election&search_type=trending_now&hours=24&count=25&countries=United States', 'ElectionArticles',true)
;

alter table article
add column
  filename_tag varchar(20) null;

insert into tag (id, tag) values (1, 'one'), (2, 'two'), (3, 'three');

insert into article_has_tag (id, tag_id, article_id) values (1, 1, 1), (2, 2, 1), (3, 3, 1);

update article set filename_tag = "CovidArticles" where id > 0;


