-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: recipes
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
-- Temporary view structure for view `vegetarianrecipeswithpotatoes`
--

DROP TABLE IF EXISTS `vegetarianrecipeswithpotatoes`;
/*!50001 DROP VIEW IF EXISTS `vegetarianrecipeswithpotatoes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vegetarianrecipeswithpotatoes` AS SELECT 
 1 AS `recipe_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `nobakecakes`
--

DROP TABLE IF EXISTS `nobakecakes`;
/*!50001 DROP VIEW IF EXISTS `nobakecakes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `nobakecakes` AS SELECT 
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `veganandjapaneserecipes`
--

DROP TABLE IF EXISTS `veganandjapaneserecipes`;
/*!50001 DROP VIEW IF EXISTS `veganandjapaneserecipes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `veganandjapaneserecipes` AS SELECT 
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vegetarianrecipeswithpotatoes`
--

/*!50001 DROP VIEW IF EXISTS `vegetarianrecipeswithpotatoes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`hyfuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vegetarianrecipeswithpotatoes` AS select `r`.`name` AS `recipe_name` from ((`recipes` `r` join `recipecategories` `rc` on((`r`.`recipe_id` = `rc`.`recipe_id`))) join `categories` `c` on((`rc`.`category_id` = `c`.`category_id`))) where ((`c`.`name` = 'Vegetarian') and (`r`.`ingredients` like '%Potatoes%')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `nobakecakes`
--

/*!50001 DROP VIEW IF EXISTS `nobakecakes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`hyfuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `nobakecakes` AS select `r`.`name` AS `name` from ((`recipes` `r` join `recipecategories` `rc` on((`r`.`recipe_id` = `rc`.`recipe_id`))) join `categories` `c` on((`rc`.`category_id` = `c`.`category_id`))) where ((`c`.`name` = 'No-Bake') and (not((`r`.`steps` like '%Bake%')))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `veganandjapaneserecipes`
--

/*!50001 DROP VIEW IF EXISTS `veganandjapaneserecipes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`hyfuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `veganandjapaneserecipes` AS select `r`.`name` AS `name` from ((`recipes` `r` join `recipecategories` `rc` on((`r`.`recipe_id` = `rc`.`recipe_id`))) join `categories` `c` on((`rc`.`category_id` = `c`.`category_id`))) where (`c`.`name` in ('Vegan','Japanese')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'recipes'
--

--
-- Dumping routines for database 'recipes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-25 21:39:15
