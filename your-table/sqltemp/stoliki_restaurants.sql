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
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `unique_key` varchar(45) DEFAULT NULL,
  `company_chain_fk` int DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_admin_fk` int DEFAULT NULL,
  `coordinate` text,
  `photos` text,
  `address` text,
  `address_json` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `rest_chain_fk_idx` (`company_chain_fk`),
  KEY `rest-user_fk_idx` (`user_admin_fk`),
  CONSTRAINT `rest-user_fk` FOREIGN KEY (`user_admin_fk`) REFERENCES `users` (`id`),
  CONSTRAINT `rest_chain_fk` FOREIGN KEY (`company_chain_fk`) REFERENCES `chain_restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'McBurger','ASHAHAYSCS',1,'2023-12-10 18:11:57',NULL,'55.782511, 37.709084','https://img.freepik.com/free-photo/a-restaurant-with-a-green-wall-and-a-wooden-table-with-a-row-of-tables-and-a-planter-with-a-plant-in-the-background_188544-37710.jpg?w=2000&t=st=1702551421~exp=1702552021~hmac=855cdd78a1aaa93a727cec5477a005c7a68dc139f4daecd08050727d922b447a,https://img.freepik.com/free-photo/side-view-of-fresh-salad-with-tomatoes-green-chili-pepper-red-onionnd-pomegranate-sauce-in-a-white-bowl_140725-11936.jpg?w=900&t=st=1702551443~exp=1702552043~hmac=b9c1cf3fe3f54d3253d336703cb4dcad88b71d0dd3ccaf871e0de62d05ddf095,https://img.freepik.com/free-photo/medium-shot-woman-working-in-luxury-restaurant_23-2150598335.jpg?w=740&t=st=1702551459~exp=1702552059~hmac=a18045ea1a67bb3be2ed1f23034b21c47dfff0cc5c4860fc8c4757db4355c33a','Москва','{\"address\": \"Большая Семёновская ул., 27, корп. 1\"}'),(2,'KingChiken','RUSKAYEVPERED',2,'2023-12-10 18:12:52',NULL,'55.790489, 37.747056','https://img.freepik.com/free-photo/a-restaurant-with-a-green-wall-and-a-wooden-table-with-a-row-of-tables-and-a-planter-with-a-plant-in-the-background_188544-37710.jpg?w=2000&t=st=1702551421~exp=1702552021~hmac=855cdd78a1aaa93a727cec5477a005c7a68dc139f4daecd08050727d922b447a,https://img.freepik.com/free-photo/side-view-of-fresh-salad-with-tomatoes-green-chili-pepper-red-onionnd-pomegranate-sauce-in-a-white-bowl_140725-11936.jpg?w=900&t=st=1702551443~exp=1702552043~hmac=b9c1cf3fe3f54d3253d336703cb4dcad88b71d0dd3ccaf871e0de62d05ddf095,https://img.freepik.com/free-photo/medium-shot-woman-working-in-luxury-restaurant_23-2150598335.jpg?w=740&t=st=1702551459~exp=1702552059~hmac=a18045ea1a67bb3be2ed1f23034b21c47dfff0cc5c4860fc8c4757db4355c33a','Москва','{\"address\": \"Измайловское ш., 71, корп. 3В, Москва\"}'),(3,'MEMENTO',NULL,3,'2023-12-10 18:13:49',NULL,'55.799269, 37.614949','https://img.freepik.com/free-photo/a-restaurant-with-a-green-wall-and-a-wooden-table-with-a-row-of-tables-and-a-planter-with-a-plant-in-the-background_188544-37710.jpg?w=2000&t=st=1702551421~exp=1702552021~hmac=855cdd78a1aaa93a727cec5477a005c7a68dc139f4daecd08050727d922b447a,https://img.freepik.com/free-photo/side-view-of-fresh-salad-with-tomatoes-green-chili-pepper-red-onionnd-pomegranate-sauce-in-a-white-bowl_140725-11936.jpg?w=900&t=st=1702551443~exp=1702552043~hmac=b9c1cf3fe3f54d3253d336703cb4dcad88b71d0dd3ccaf871e0de62d05ddf095,https://img.freepik.com/free-photo/medium-shot-woman-working-in-luxury-restaurant_23-2150598335.jpg?w=740&t=st=1702551459~exp=1702552059~hmac=a18045ea1a67bb3be2ed1f23034b21c47dfff0cc5c4860fc8c4757db4355c33a','Москва','{\"address\": \"Шереметьевская ул., 19, корп. 2, стр. 2\"}');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 20:48:36
