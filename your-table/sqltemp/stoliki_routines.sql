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
-- Dumping events for database 'stoliki'
--

--
-- Dumping routines for database 'stoliki'
--
/*!50003 DROP PROCEDURE IF EXISTS `addUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser`(IN cname VARCHAR(45), cpassword VARCHAR(45))
BEGIN
	if((select count(*) from users where users.name = cname ) > 0) then
		select "pls change name!"; 
    end if;
    
	if((select count(*) from users where users.name = cname ) = 0) then 
		insert into users(name, password,user_type_fk) 
        value(cname,cpassword,1);
        select * from users where users.name = cname;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createChainAndCompany` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createChainAndCompany`(companyName varchar(45))
BEGIN
	if((select count(*) from chain_restaurants 
		join companys 
		on chain_restaurants.company_fk = companys.id 
		where companys.title = companyName ) 
									   = 0 ) then
        insert into companys (title) 
        values (companyName);
        insert into chain_restaurants (company_fk, title) 
        values((select id from companys where title = companyName limit 1), companyName);
        end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createRestaurant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createRestaurant`(in cName VARCHAR(45), ukey varchar(45), companyName varchar(45), coordinate TEXT, photos text, adress text)
BEGIN
	if((select count(*) from chain_restaurants 
		join companys 
		on chain_restaurants.company_fk = companys.id 
		where companys.title = companyName ) 
									   = 0 ) then
        insert into companys (title) 
        values (companyName);
        insert into chain_restaurants (company_fk, title) 
        values((select id from companys where title = companyName limit 1), companyName);
        call createRestaurant(cName, ukey, companyName, coordinate, photos, adress);
        end if;
	if((select count(*) from chain_restaurants 
		join companys 
		on chain_restaurants.company_fk = companys.id 
		where companys.title = companyName ) 
									   > 0 ) then
		select * from companys;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `editUserChangeName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `editUserChangeName`(in cID int, cName varchar(45))
BEGIN
	if ((select count(*) from users where user.id = cID) > 0) then
		update users
		set users.name = cName where users.id = cID;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `editUserChangePass` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `editUserChangePass`(IN cID int, cNewPass varchar(45))
BEGIN
	update users 
    set users.password = cNewPass where users.id = cID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllRestaurants` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllRestaurants`()
BEGIN
select rs.id as resId, 
    rs.title as nameRest, 
    rs.unique_key as uKey, 
    companys.title as chainName,
    chain_restaurants.title as companysName,
    rs.create_time as createTime,
    rs.coordinate,
    rs.photos photos,
    rs.address,
    rs.address_json,
    GROUP_CONCAT(distinct type_kitchen.type order by type_kitchen.id) as typeKitchen,
    CAST(CONCAT('[', 
		GROUP_CONCAT(distinct JSON_OBJECT(
		"day", days.title,
		"timeStart",work_schedules.time_begin,
		"timeEnd",work_schedules.time_end
		) order by days.id), ']') AS JSON) as schedule,
	group_concat(distinct zones.id," ",zones.title order by zones.id) as zones,
	group_concat(distinct zones.id, " ",slots.id, " ",slots.number, " ",slots.max_people_in_slot) as slots
    
from restaurants as rs 
left join kitchen_list on rs.id = kitchen_list.restaurant_fk
left join type_kitchen on type_kitchen.id = kitchen_list.kitchen_type_fk
left join chain_restaurants on chain_restaurants.id = rs.company_chain_fk
left join companys on chain_restaurants.company_fk = companys.id
left join work_schedules on rs.id = work_schedules.restaurant_fk
left join days on work_schedules.day_fk = days.id
left join zones on rs.id = zones.restaurant_fk
left join slots on slots.zones_fk = slots.id
    group by rs.id, chain_restaurants.id, companys.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRestaurantById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRestaurantById`(in resId int)
BEGIN
select rs.id as resId, 
    rs.title as nameRest, 
    rs.unique_key as uKey, 
    companys.title as chainName,
    chain_restaurants.title as companysName,
    rs.create_time as createTime,
    rs.coordinate,
    rs.photos photos,
    rs.address,
    rs.address_json,
    GROUP_CONCAT(distinct type_kitchen.type order by type_kitchen.id) as typeKitchen,
    CAST(CONCAT('[', 
		GROUP_CONCAT(distinct JSON_OBJECT(
		"day", days.title,
		"timeStart",work_schedules.time_begin,
		"timeEnd",work_schedules.time_end
		) order by days.id), ']') AS JSON) as schedule,
	group_concat(distinct zones.id," ",zones.title order by zones.id) as zones,
	group_concat(distinct zones.id, " ",slots.id, " ",slots.number, " ",slots.max_people_in_slot) as slots
    
from restaurants as rs 
left join kitchen_list on rs.id = kitchen_list.restaurant_fk
left join type_kitchen on type_kitchen.id = kitchen_list.kitchen_type_fk
left join chain_restaurants on chain_restaurants.id = rs.company_chain_fk
left join companys on chain_restaurants.company_fk = companys.id
left join work_schedules on rs.id = work_schedules.restaurant_fk
left join days on work_schedules.day_fk = days.id
left join zones on rs.id = zones.restaurant_fk
left join slots on slots.zones_fk = slots.id
	where rs.id = resId
    group by rs.id, chain_restaurants.id, companys.id;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_procedure`()
BEGIN
select rs.id as resId, 
    rs.title as nameRest, 
    rs.unique_key as uKey, 
    companys.title as chainName,
    chain_restaurants.title as companysName,
    rs.create_time as createTime,
    rs.coordinate,
    rs.photos photos,
    rs.address,
    rs.address_json,
    GROUP_CONCAT(distinct type_kitchen.type order by type_kitchen.id) as typeKitchen,
    CAST(CONCAT('[', 
		GROUP_CONCAT(distinct JSON_OBJECT(
		"day", days.title,
		"timeStart",work_schedules.time_begin,
		"timeEnd",work_schedules.time_end
		) order by days.id), ']') AS JSON) as schedule,
	group_concat(distinct zones.id," ",zones.title order by zones.id) as zones,
	group_concat(distinct zones.id, " ",slots.id, " ",slots.number) as slots
    
from restaurants as rs 
left join kitchen_list on rs.id = kitchen_list.restaurant_fk
left join type_kitchen on type_kitchen.id = kitchen_list.kitchen_type_fk
left join chain_restaurants on chain_restaurants.id = rs.company_chain_fk
left join companys on chain_restaurants.company_fk = companys.id
left join work_schedules on rs.id = work_schedules.restaurant_fk
left join days on work_schedules.day_fk = days.id
left join zones on rs.id = zones.restaurant_fk
left join slots on slots.zones_fk = slots.id
    group by rs.id, chain_restaurants.id, companys.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 20:48:36
