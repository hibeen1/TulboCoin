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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` bigint NOT NULL,
  `balance` bigint DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `invest_start_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `UK_8qtpnv06elxuryeuv1ac4ximm` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (50,10000000,'qwerqwer@naver.com','1','$2a$10$dMtGqgI0a750ZMTsvuwxv.uFZvlbP/rrnpASGhoWRVISeNSUEilyu','qwerqwer','2022-10-02 14:04:43.506000'),(60,32312087551,'qownstlr0394@naver.com','3','$2a$10$TrHDqckA2Y42aVUXBPdM6OMDe2NTH64rI/gvNSPTshJgztqs08p0S','qweqwe','2022-09-30 03:07:38.231000'),(70,10000000,'qre@qa.vq','5','$2a$10$dMtGqgI0a750ZMTsvuwxv.uFZvlbP/rrnpASGhoWRVISeNSUEilyu','test','2022-10-06 16:02:02.266000'),(80,100,'qownstlr0394@naver.com','1','qweqwe','배준식','2022-10-02 00:45:36.659000'),(433,10000000,'qwer@qew.de','1','$2a$10$e8o09IWMk8nxOqkG0oJd/OJ46Y7VRkUUg3/fYXedx1Yr6EM4i0V9S','qwer','2022-10-02 00:45:36.659000'),(434,9983335,'qownstlr0394@naver.com','1','$2a$10$0bz94/e2kDdQP3hy74RSg.2t6TIPBjz9cH7R.rOrAJSJlkJPuZ8Q.','준배','2022-10-02 02:05:56.582000'),(445,10000000,'asdf@q.as','1','$2a$10$ySNkqupbIcPoLpvJEwluxubfft1HOdZhGT3XqjFmPvRWOkamNQCRS','asdf','2022-10-02 02:35:48.961000'),(454,10000000,'qwer@qwre.we','5','$2a$10$wt5YWjCxNGfd/DGgcgKexO.uUXd2LnN0c1pEcg3JV5g3zvffBgrom','김혜라1','2022-10-02 13:47:04.999000'),(455,6128180,'kjasm0715@naver.com','3','$2a$10$YCdIu/lbMqSxlThTVvKhO.BriG3QL7M94imVJNgcqFuhwDcLwZceC','qwerqwer1','2022-10-02 13:47:46.501000'),(481,9921244986000,'qownstlr0394@naver.com','4','$2a$10$v2lT8VniJfvf.Tk0OX2J5edswGxJIse5o1MF8IKF/GwdiX3tCePMK','junbae','2022-10-03 02:13:38.629000'),(620,10000000,'test@test.com','1','$2a$10$8/lbCbtxVAvfwe97iFY0XudzOamCWihCOmyMV.P1uiXxqwcx3Bd2m','ttest','2022-10-03 23:50:34.258000'),(621,10000000,'junzzamg9@gmail.com','1','$2a$10$v0n2oaRpucy6mc9mktLqx.prZIobDN0rbnnDi6WRo30VJkpBcOrom','dong8','2022-10-04 08:56:36.417000'),(622,10000000,'abcde@ssafy.com','1','$2a$10$3yb5zpeuFnodXLUwn7RKfOos2sYZ7IpgaBPhkrIAyriLFsiVOK2CS','abcde','2022-10-04 09:59:40.736000'),(623,999999999979600,'zxcv@asdf.ds','1','$2a$10$RHR2maB5M/jmTQ44OCwRHeD3fds.hViOyEFBH7pjICxE6YSuwceyG','zxcv','2022-10-04 14:36:14.595000'),(746,9441640,'asd@asd.asd','1','$2a$10$iZxxi8izda5WL52uAeiVMuWMOzGiSJkIS0PjTSNov8MSWOptCdNVO','asd','2022-10-04 19:48:04.612000'),(897,10000000,'kublaihkan@naver.com','1','$2a$10$k9HrLuwdnFEUoztSLa4le.Y39LWHP/Bm5k3xvTsrEyjZAyo7c6kJC','kublaihkan','2022-10-05 10:38:22.206000'),(898,10000000,'asdf@asdf.ss','1','$2a$10$B5/p8wvF86rQNHa/Uxd/pOVSoY/3lCYoF4SWMm0my1ZdKrPSkgvqS','asdfasdf','2022-10-05 12:08:48.914000'),(939,1322500,'tulbo@ssafy.com','1','$2a$10$ekN0E2J01zmzcO566Sl/3.anInuvebWGEY8zsX76rX2Dlsu2KDjsS','tulbo33','2022-10-05 16:45:48.013000'),(984,9985390,'zxcv@ads.aa','1','$2a$10$ljDEcqnDJy1K32Dxn6HIPeTlqydb3VeIzjVXctAf6OJfMWPSxtEgq','zxvc','2022-10-06 10:00:46.954000'),(1396,9999500,'asdf@asdf.ad','2','$2a$10$0sPly2OANpoFzk16tGdErOmw0G7ePAtdJRlAlYKDC5qO0OdA/9qB.','박동재','2022-10-06 12:16:18.182000');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06 16:14:21
