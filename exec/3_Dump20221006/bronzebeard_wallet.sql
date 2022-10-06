-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: j7e203.p.ssafy.io    Database: bronzebeard
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `wallet_seq` bigint NOT NULL,
  `wallet_coin_amount` double DEFAULT NULL,
  `wallet_coin_average` double DEFAULT NULL,
  `wallet_coin_name` varchar(255) DEFAULT NULL,
  `user_seq` bigint DEFAULT NULL,
  `wallet_coin_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`wallet_seq`),
  KEY `FK3xu07q3tnequ1ulskr4foqmwt` (`user_seq`),
  CONSTRAINT `FK3xu07q3tnequ1ulskr4foqmwt` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (437,11,1515,'메탈',434,'KRW-MTL'),(458,2,1896000,'이더리움',455,'KRW-ETH'),(462,2,39910,'이더리움클래식',455,'KRW-ETC'),(484,1,12470,'네오',481,'KRW-NEO'),(528,28,2419.464285714286,'오미세고',481,'KRW-OMG'),(639,10,40,'스테이터스네트워크토큰',623,'KRW-SNT'),(749,44,12690,'네오',746,'KRW-NEO'),(945,111,377,'골렘',60,'KRW-GLM'),(969,13,832,'1인치네트워크',60,'KRW-1INCH'),(974,2,59,'넴',60,'KRW-XEM'),(978,4,219,'누사이퍼',60,'KRW-NU'),(1094,1,12440,'네오',60,'KRW-NEO'),(1098,1,5315,'니어프로토콜',60,'KRW-NEAR'),(1102,1,1085,'던프로토콜',60,'KRW-DAWN'),(1106,2,6,'메인프레임',60,'KRW-MFT'),(1112,1,378,'골렘',984,'KRW-GLM'),(1122,1,838,'1인치네트워크',984,'KRW-1INCH'),(1134,2,442,'그로스톨코인',984,'KRW-GRS'),(1138,1,12520,'네오',984,'KRW-NEO'),(1144,50500,45,'질리카',939,'KRW-ZIL'),(1149,2,1942500,'이더리움',939,'KRW-ETH'),(1153,5000,504,'알고랜드',939,'KRW-ALGO'),(1411,100,5,'캐리프로토콜',1396,'KRW-CRE'),(1446,1,198,'아르고',60,'KRW-AERGO'),(1524,0.09000000000000007,376.99999999999943,'골렘',70,'KRW-GLM');
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06 16:14:19
