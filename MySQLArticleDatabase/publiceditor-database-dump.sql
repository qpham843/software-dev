drop database if exists publiceditor;
create database if not exists publiceditor;
use publiceditor;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) DEFAULT NULL,
  `author` char(50) DEFAULT NULL,
  `url` char(150) DEFAULT NULL,
  `publish_date` timestamp NULL DEFAULT NULL,
  `article_text` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 ;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `article` VALUES (1,'the meaning of life','anonymous','www.life.com/meaning.htm','2012-01-01 10:00:00','lorem ipsum'),(2,'the meaning of happiness','buddha','www.happinesstimes.com/happiness-meanng.html','2012-02-02 10:00:00','lorem');
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_current_status` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `author`,
 1 AS `url`,
 1 AS `publish_date`,
 1 AS `article_text`,
 1 AS `status_code`,
 1 AS `status_text`*/;
SET character_set_client = @saved_cs_client;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_has_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `article_status_id` int(11) DEFAULT NULL,
  `date_changed` timestamp NULL DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 ;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `article_has_status` VALUES (1,1,1,'2019-09-18 23:29:00','aaaaa'),(2,2,1,'2019-09-18 23:29:00','bbbbb'),(3,2,2,'2019-09-19 00:29:00','ccc');
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_code` char(3) NOT NULL,
  `status_text` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 ;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `article_status` VALUES (1,'A','Url From BuzzFeed'),(2,'B','Scraped'),(3,'C','Metadata Extracted'),(4,'D','File Created'),(5,'E','Sent to Tagworks'),(6,'F','Tagworks Complete'),(7,'G','Metadata Error'),(8,'H','Tagworks Rejected');SET @saved_cs_client     = @@character_set_client;

create view article_sub_status_view as
select article_id, max(date_changed) as MaxDateTime
	from article_has_status group by article_id
;

create view article_current_status as
select 
	a.*
from
	article a,
    article_has_status ahs,
    article_status st,
    article_sub_status_view assv
where
	ahs.article_id = assv.article_id and
    ahs.date_changed = assv.MaxDateTime and
	a.id = assv.article_id and
    st.id = ahs.article_status_id
;

CREATE VIEW `publiceditor`.`article_status_view` AS select `ahs`.`id` AS `id`,`ahs`.`article_id` AS `article_id`,`ahs`.`date_changed` AS `date_changed`,`ahs`.`comment` AS `comment`,`ast`.`status_code` AS `status_code`,`ast`.`status_text` AS `status_text` from (`publiceditor`.`article_has_status` `ahs` join `publiceditor`.`article_status` `ast`) where (`ahs`.`article_status_id` = `ast`.`id`);

