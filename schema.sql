-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: tottenhammensleague.com    Database: totte873_maindb
-- ------------------------------------------------------
-- Server version	5.7.37

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
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `gamesid` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `seasonsId` int(11) DEFAULT NULL,
  `uploaded` int(11) DEFAULT NULL,
  `isPlayoffs` int(11) DEFAULT NULL,
  `isOvertime` int(11) DEFAULT NULL,
  `isFinals` int(11) DEFAULT '0',
  PRIMARY KEY (`gamesid`)
) ENGINE=InnoDB AUTO_INCREMENT=985 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `goalsId` int(11) NOT NULL AUTO_INCREMENT,
  `gamesId` int(11) DEFAULT NULL,
  `teamsId` int(11) DEFAULT NULL,
  `goal` int(11) DEFAULT NULL,
  `assist1` int(11) DEFAULT NULL,
  `assist2` int(11) DEFAULT NULL,
  `isSHG` int(11) DEFAULT NULL,
  `isPP` int(11) DEFAULT NULL,
  `isOT` int(11) DEFAULT NULL,
  `period` int(11) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`goalsId`)
) ENGINE=InnoDB AUTO_INCREMENT=5800 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leagues`
--

DROP TABLE IF EXISTS `leagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leagues` (
  `leaguesid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`leaguesid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `penalties`
--

DROP TABLE IF EXISTS `penalties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penalties` (
  `penaltiesId` int(11) NOT NULL AUTO_INCREMENT,
  `gamesId` int(11) DEFAULT NULL,
  `teamsId` int(11) DEFAULT NULL,
  `playersId` int(11) DEFAULT NULL,
  `infraction` varchar(45) DEFAULT NULL,
  `minutes` int(11) DEFAULT NULL,
  `period` varchar(10) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `isGameMisconduct` int(2) DEFAULT '0',
  PRIMARY KEY (`penaltiesId`)
) ENGINE=InnoDB AUTO_INCREMENT=1862 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `playersId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `isActive` int(2) DEFAULT NULL,
  `latestRating19` varchar(45) DEFAULT NULL,
  `latestRating40` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `isActive40` int(2) DEFAULT NULL,
  `isNew` int(2) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `covidSkip` int(2) DEFAULT NULL,
  `isPaid` int(2) DEFAULT NULL,
  `inactiveEmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`playersId`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playersforteams`
--

DROP TABLE IF EXISTS `playersforteams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playersforteams` (
  `playersforteamsId` int(11) NOT NULL AUTO_INCREMENT,
  `teamsId` int(11) DEFAULT NULL,
  `playersId` varchar(45) DEFAULT NULL,
  `playerNumber` int(11) DEFAULT NULL,
  `isGoalie` int(11) DEFAULT NULL,
  `isCaptain` int(11) DEFAULT NULL,
  `isActive` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`playersforteamsId`)
) ENGINE=InnoDB AUTO_INCREMENT=1073 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `returningPlayers`
--

DROP TABLE IF EXISTS `returningPlayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returningPlayers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `confirmedAt` datetime DEFAULT NULL,
  `league` varchar(10) DEFAULT NULL,
  `response` int(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=498 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seasons` (
  `seasonsid` int(11) NOT NULL AUTO_INCREMENT,
  `leaguesid` int(11) DEFAULT NULL,
  `isActive` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `hasStats` int(11) DEFAULT '0',
  `hasStatsV2` int(11) DEFAULT '0',
  PRIMARY KEY (`seasonsid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `teamsId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `seasonsId` int(11) DEFAULT NULL,
  `isActive` int(11) DEFAULT NULL,
  PRIMARY KEY (`teamsId`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teamsforgames`
--

DROP TABLE IF EXISTS `teamsforgames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamsforgames` (
  `teamsforgamesid` int(11) NOT NULL AUTO_INCREMENT,
  `gamesId` int(11) DEFAULT NULL,
  `homeId` int(11) DEFAULT NULL,
  `awayId` int(11) DEFAULT NULL,
  PRIMARY KEY (`teamsforgamesid`)
) ENGINE=InnoDB AUTO_INCREMENT=982 DEFAULT CHARSET=latin1;

--
-- Table structure for table `waitingList`
--

DROP TABLE IF EXISTS `waitingList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `waitinglist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `age` varchar(4) DEFAULT NULL,
  `division` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  `lastYear` varchar(45) DEFAULT NULL,
  `people` varchar(100) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `createdTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=629 DEFAULT CHARSET=utf8;


/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-27 14:03:06
