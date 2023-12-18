-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stoliki
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `work_schedules`
--

DROP TABLE IF EXISTS `work_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day_fk` int DEFAULT NULL,
  `time_begin` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `work_schedlescol` varchar(45) DEFAULT NULL,
  `restaurant_fk` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `schedules-rest_fk_idx` (`restaurant_fk`),
  CONSTRAINT `schedules-rest_fk` FOREIGN KEY (`restaurant_fk`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_schedules`
--

LOCK TABLES `work_schedules` WRITE;
/*!40000 ALTER TABLE `work_schedules` DISABLE KEYS */;
INSERT INTO `work_schedules` VALUES (22,1,'06:00:00','19:00:00','1',1),(23,2,'06:00:00','19:00:00','1',1),(24,3,'06:00:00','19:00:00','1',1),(25,4,'06:00:00','19:00:00','1',1),(26,5,'06:00:00','19:00:00','1',1),(27,6,'06:00:00','19:00:00','1',1),(28,7,'06:00:00','19:00:00','1',1),(29,1,'06:00:00','19:00:00','1',2),(30,2,'06:00:00','19:00:00','1',2),(31,3,'06:00:00','19:00:00','1',2),(32,4,'06:00:00','19:00:00','1',2),(33,5,'06:00:00','19:00:00','1',2),(34,6,'06:00:00','19:00:00','1',2),(35,7,'06:00:00','19:00:00','1',2),(36,1,'09:00:00','15:00:00','1',3),(37,2,'09:00:00','15:00:00','1',3),(38,3,'09:00:00','15:00:00','1',3),(39,4,'09:00:00','15:00:00','1',3),(40,5,'09:00:00','15:00:00','1',3),(41,6,'09:00:00','15:00:00','1',3),(42,7,'09:00:00','15:00:00','1',3);
/*!40000 ALTER TABLE `work_schedules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 20:48:35
