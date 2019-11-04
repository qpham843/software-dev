-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: publiceditor
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) DEFAULT NULL,
  `author` char(50) DEFAULT NULL,
  `url` char(150) DEFAULT NULL,
  `publish_date` timestamp NULL DEFAULT NULL,
  `article_text` mediumtext,
  `author_name` char(50) DEFAULT NULL,
  `article_title` char(200) DEFAULT NULL,
  `article_amplifiers` varchar(500) DEFAULT NULL,
  `domain_name` char(100) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `buzzsumo_article_id` int(11) DEFAULT NULL,
  `published_date` int(11) DEFAULT NULL,
  `total_shares` int(11) DEFAULT NULL,
  `thumbnail_url` char(200) DEFAULT NULL,
  `num_words` int(11) DEFAULT NULL,
  `alexa_rank` int(11) DEFAULT NULL,
  `twitter_shares` int(11) DEFAULT NULL,
  `love_count` int(11) DEFAULT NULL,
  `evergreen_score` double DEFAULT NULL,
  `total_reddit_engagements` int(11) DEFAULT NULL,
  `wow_count` int(11) DEFAULT NULL,
  `facebook_likes` int(11) DEFAULT NULL,
  `facebook_comments` int(11) DEFAULT NULL,
  `sad_count` int(11) DEFAULT NULL,
  `total_facebook_shares` int(11) DEFAULT NULL,
  `angry_count` int(11) DEFAULT NULL,
  `facebook_shares` int(11) DEFAULT NULL,
  `num_linking_domains` int(11) DEFAULT NULL,
  `haha_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'the meaning of life','anonymous','www.life.com/meaning.htm','2012-01-01 15:00:00','lorem ipsum',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'the meaning of happiness','buddha','www.happinesstimes.com/happiness-meanng.html','2012-02-02 15:00:00','lorem',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'','','https://www.google.com','2019-10-27 16:51:32','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_current_status`
--

DROP TABLE IF EXISTS `article_current_status`;
/*!50001 DROP VIEW IF EXISTS `article_current_status`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_current_status` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `author`,
 1 AS `url`,
 1 AS `publish_date`,
 1 AS `article_text`,
 1 AS `status_code`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `article_has_status`
--

DROP TABLE IF EXISTS `article_has_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_has_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `article_status_id` int(11) DEFAULT NULL,
  `date_changed` timestamp NULL DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_has_status`
--

LOCK TABLES `article_has_status` WRITE;
/*!40000 ALTER TABLE `article_has_status` DISABLE KEYS */;
INSERT INTO `article_has_status` VALUES (1,1,1,'2019-09-19 03:29:00','aaaaa'),(2,2,1,'2019-09-19 03:29:00','bbbbb'),(3,2,2,'2019-09-19 04:29:00','ccc'),(4,3,1,'2019-10-27 16:51:32','');
/*!40000 ALTER TABLE `article_has_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_status`
--

DROP TABLE IF EXISTS `article_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_code` char(10) DEFAULT NULL,
  `status_text` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_status`
--

LOCK TABLES `article_status` WRITE;
/*!40000 ALTER TABLE `article_status` DISABLE KEYS */;
INSERT INTO `article_status` VALUES (1,'BUZZ','Url From BuzzFeed'),(2,'USER','Url from User'),(3,'APPROVED','NICK Approved for tag works'),(4,'ERROR','Error');
/*!40000 ALTER TABLE `article_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_status_view`
--

DROP TABLE IF EXISTS `article_status_view`;
/*!50001 DROP VIEW IF EXISTS `article_status_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_status_view` AS SELECT 
 1 AS `id`,
 1 AS `article_id`,
 1 AS `date_changed`,
 1 AS `comment`,
 1 AS `status_code`,
 1 AS `status_text`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `article_sub_status_view`
--

DROP TABLE IF EXISTS `article_sub_status_view`;
/*!50001 DROP VIEW IF EXISTS `article_sub_status_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_sub_status_view` AS SELECT 
 1 AS `article_id`,
 1 AS `MaxDateTime`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `article_current_status`
--

/*!50001 DROP VIEW IF EXISTS `article_current_status`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_current_status` AS select `a`.`id` AS `id`,`a`.`title` AS `title`,`a`.`author` AS `author`,`a`.`url` AS `url`,`a`.`publish_date` AS `publish_date`,`a`.`article_text` AS `article_text`,`st`.`status_code` AS `status_code` from (((`article` `a` join `article_has_status` `ahs`) join `article_status` `st`) join `article_sub_status_view` `assv`) where ((`ahs`.`article_id` = `assv`.`article_id`) and (`ahs`.`date_changed` = `assv`.`MaxDateTime`) and (`a`.`id` = `assv`.`article_id`) and (`st`.`id` = `ahs`.`article_status_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_status_view`
--

/*!50001 DROP VIEW IF EXISTS `article_status_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_status_view` AS select `ahs`.`id` AS `id`,`ahs`.`article_id` AS `article_id`,`ahs`.`date_changed` AS `date_changed`,`ahs`.`comment` AS `comment`,`ast`.`status_code` AS `status_code`,`ast`.`status_text` AS `status_text` from (`article_has_status` `ahs` join `article_status` `ast`) where (`ahs`.`article_status_id` = `ast`.`id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `article_sub_status_view`
--

/*!50001 DROP VIEW IF EXISTS `article_sub_status_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `article_sub_status_view` AS select `article_has_status`.`article_id` AS `article_id`,max(`article_has_status`.`date_changed`) AS `MaxDateTime` from `article_has_status` group by `article_has_status`.`article_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-04  8:15:47
