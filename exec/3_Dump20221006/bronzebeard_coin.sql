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
-- Table structure for table `coin`
--

DROP TABLE IF EXISTS `coin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin` (
  `coin_seq` bigint NOT NULL,
  `coin_code` varchar(255) DEFAULT NULL,
  `coin_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`coin_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin`
--

LOCK TABLES `coin` WRITE;
/*!40000 ALTER TABLE `coin` DISABLE KEYS */;
INSERT INTO `coin` VALUES (324,'KRW-XLM','스텔라루멘'),(335,'KRW-BTC','비트코인'),(339,'KRW-ETC','이더리움클래식'),(353,'KRW-OMG','오미세고'),(357,'KRW-HIVE','하이브'),(361,'KRW-XRP','리플'),(365,'KRW-WAVES','웨이브'),(369,'KRW-STEEM','스팀'),(376,'KRW-LSK','리스크'),(380,'KRW-GRS','그로스톨코인'),(391,'KRW-MTL','메탈'),(399,'KRW-NEO','네오'),(412,'KRW-SNT','스테이터스네트워크토큰'),(430,'KRW-ETH','이더리움'),(647,'KRW-XEM','넴'),(648,'KRW-QTUM','퀀텀'),(649,'KRW-ARDR','아더'),(650,'KRW-ARK','아크'),(651,'KRW-STORJ','스토리지'),(652,'KRW-REP','어거'),(653,'KRW-ADA','에이다'),(654,'KRW-SBD','스팀달러'),(655,'KRW-POWR','파워렛저'),(656,'KRW-BTG','비트코인골드'),(657,'KRW-ICX','아이콘'),(658,'KRW-EOS','이오스'),(659,'KRW-TRX','트론'),(660,'KRW-SC','시아코인'),(661,'KRW-ONT','온톨로지'),(662,'KRW-ZIL','질리카'),(663,'KRW-POLY','폴리매쓰'),(664,'KRW-ZRX','제로엑스'),(665,'KRW-LOOM','룸네트워크'),(666,'KRW-BCH','비트코인캐시'),(667,'KRW-BAT','베이직어텐션토큰'),(668,'KRW-IOST','아이오에스티'),(669,'KRW-RFR','리퍼리움'),(670,'KRW-CVC','시빅'),(671,'KRW-IQ','에브리피디아'),(672,'KRW-IOTA','아이오타'),(673,'KRW-MFT','메인프레임'),(674,'KRW-ONG','온톨로지가스'),(675,'KRW-GAS','가스'),(676,'KRW-UPP','센티넬프로토콜'),(677,'KRW-ELF','엘프'),(678,'KRW-KNC','카이버네트워크'),(679,'KRW-BSV','비트코인에스브이'),(680,'KRW-THETA','쎄타토큰'),(681,'KRW-QKC','쿼크체인'),(682,'KRW-BTT','비트토렌트'),(683,'KRW-MOC','모스코인'),(684,'KRW-ENJ','엔진코인'),(685,'KRW-TFUEL','쎄타퓨엘'),(686,'KRW-MANA','디센트럴랜드'),(687,'KRW-ANKR','앵커'),(688,'KRW-AERGO','아르고'),(689,'KRW-ATOM','코스모스'),(690,'KRW-TT','썬더코어'),(691,'KRW-CRE','캐리프로토콜'),(692,'KRW-MBL','무비블록'),(693,'KRW-WAXP','왁스'),(694,'KRW-HBAR','헤데라'),(695,'KRW-MED','메디블록'),(696,'KRW-MLK','밀크'),(697,'KRW-STPT','에스티피'),(698,'KRW-ORBS','오브스'),(699,'KRW-VET','비체인'),(700,'KRW-CHZ','칠리즈'),(701,'KRW-STMX','스톰엑스'),(702,'KRW-DKA','디카르고'),(703,'KRW-KAVA','카바'),(704,'KRW-AHT','아하토큰'),(705,'KRW-LINK','체인링크'),(706,'KRW-XTZ','테조스'),(707,'KRW-BORA','보라'),(708,'KRW-JST','저스트'),(709,'KRW-CRO','크로노스'),(710,'KRW-TON','톤'),(711,'KRW-SXP','솔라'),(712,'KRW-HUNT','헌트'),(713,'KRW-PLA','플레이댑'),(714,'KRW-DOT','폴카닷'),(715,'KRW-SRM','세럼'),(716,'KRW-MVL','엠블'),(717,'KRW-STRAX','스트라티스'),(718,'KRW-AQT','알파쿼크'),(719,'KRW-GLM','골렘'),(720,'KRW-SSX','썸씽'),(721,'KRW-META','메타디움'),(722,'KRW-FCT2','피르마체인'),(723,'KRW-CBK','코박토큰'),(724,'KRW-SAND','샌드박스'),(725,'KRW-HUM','휴먼스케이프'),(726,'KRW-DOGE','도지코인'),(727,'KRW-STRK','스트라이크'),(728,'KRW-PUNDIX','펀디엑스'),(729,'KRW-FLOW','플로우'),(730,'KRW-DAWN','던프로토콜'),(731,'KRW-AXS','엑시인피니티'),(732,'KRW-STX','스택스'),(733,'KRW-XEC','이캐시'),(734,'KRW-SOL','솔라나'),(735,'KRW-MATIC','폴리곤'),(736,'KRW-NU','누사이퍼'),(737,'KRW-AAVE','에이브'),(738,'KRW-1INCH','1인치네트워크'),(739,'KRW-ALGO','알고랜드'),(740,'KRW-NEAR','니어프로토콜'),(741,'KRW-WEMIX','위믹스'),(742,'KRW-AVAX','아발란체'),(743,'KRW-T','쓰레스홀드'),(744,'KRW-CELO','셀로'),(745,'KRW-GMT','스테픈'),(1459,'KRW-ETH','이더리움(KRW-ETH)');
/*!40000 ALTER TABLE `coin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06 16:14:20
