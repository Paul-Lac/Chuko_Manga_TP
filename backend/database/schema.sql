
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema chuko_manga_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chuko_manga_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chuko_manga_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `chuko_manga_db` ;

-- -----------------------------------------------------
-- Table `chuko_manga_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pseudo` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `email` VARCHAR(150) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `picture` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`publishing_house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`publishing_house` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_publishing_house` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '	';


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `genre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`manga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`manga` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT(65535) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `author` VARCHAR(150) NOT NULL,
  `script_writer` VARCHAR(255) NOT NULL,
  `illustrator` VARCHAR(255) NOT NULL,
  `release_date` YEAR NOT NULL,
  `publishing_house_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  `finish_japan` TINYINT NOT NULL,
  `finish_france` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_manga_publishing_house1_idx` (`publishing_house_id` ASC) VISIBLE,
  INDEX `fk_manga_genre1_idx` (`genre_id` ASC) VISIBLE,
  CONSTRAINT `fk_manga_publishing_house1`
    FOREIGN KEY (`publishing_house_id`)
    REFERENCES `chuko_manga_db`.`publishing_house` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_manga_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `chuko_manga_db`.`genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`volume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`volume` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `number_volume` INT NOT NULL,
  `publication_year` YEAR NULL,
  `image` VARCHAR(255) NOT NULL,
  `ISBN` VARCHAR(55) NULL,
  `manga_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_volume_manga1_idx` (`manga_id` ASC) VISIBLE,
  CONSTRAINT `fk_volume_manga`
    FOREIGN KEY (`manga_id`)
    REFERENCES `chuko_manga_db`.`manga` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`article_condition`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`article_condition` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_condition` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`advert`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`advert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` DECIMAL(10,2) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `alert` TINYINT NOT NULL,
  `batch` TINYINT NOT NULL,
  `title_search_manga` VARCHAR(40) NULL,
  -- `view_number` INT NOT NULL DEFAULT 0,
  `publication_date_advert` DATE NOT NULL,
  `delete_advert` TINYINT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  `volume_id` INT NULL,
  `article_condition_id` INT NOT NULL,
  `manga_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_advert_user1_idx` (`user_id` ASC) INVISIBLE,
  INDEX `fk_advert_volume1_idx` (`volume_id` ASC) VISIBLE,
  INDEX `fk_advert_condition1_idx` (`article_condition_id` ASC) VISIBLE,
  INDEX `fk_advert_manga1_idx` (`manga_id` ASC) VISIBLE,
  CONSTRAINT `fk_advert_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chuko_manga_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_advert_volume1`
    FOREIGN KEY (`volume_id`)
    REFERENCES `chuko_manga_db`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_advert_condition1`
    FOREIGN KEY (`article_condition_id`)
    REFERENCES `chuko_manga_db`.`article_condition` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_advert_manga1`
    FOREIGN KEY (`manga_id`)
    REFERENCES `chuko_manga_db`.`manga` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
KEY_BLOCK_SIZE = 8;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user_buy` INT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `order_date` DATE NOT NULL,
  `status_order` ENUM('pending', 'completed', 'cancelled') NOT NULL,
  `feedback_order` TINYINT NOT NULL,
  `advert_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_advert1_idx` (`advert_id` ASC) VISIBLE,
  INDEX `fk_order_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_advert1`
    FOREIGN KEY (`advert_id`)
    REFERENCES `chuko_manga_db`.`advert` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chuko_manga_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL,
  `zip_code` INT NOT NULL,
  `number_street` VARCHAR(255) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `name_adress` VARCHAR(75) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  `created_on` DATETIME NOT NULL,
  `user_buyer` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chuko_manga_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`alert_stock`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`alert_stock` (
--   `user_id` INT NOT NULL,
--   `volume_id` INT NOT NULL,
--   PRIMARY KEY (`user_id`, `volume_id`),
--   INDEX `fk_user_has_volume_volume1_idx` (`volume_id` ASC) VISIBLE,
--   INDEX `fk_user_has_volume_user1_idx` (`user_id` ASC) VISIBLE,
--   CONSTRAINT `fk_user_has_volume_user1`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `chuko_manga_db`.`user` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_user_has_volume_volume1`
--     FOREIGN KEY (`volume_id`)
--     REFERENCES `chuko_manga_db`.`volume` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`category`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`category` (
--   `id_category` INT NOT NULL AUTO_INCREMENT,
--   `name_categoy` VARCHAR(75) NOT NULL,
--   PRIMARY KEY (`id_category`))
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`category_has_manga`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`category_has_manga` (
--   `category_idcategory` INT NOT NULL,
--   `manga_id` INT NOT NULL,
--   PRIMARY KEY (`category_idcategory`, `manga_id`),
--   INDEX `fk_category_has_manga_manga1_idx` (`manga_id` ASC) VISIBLE,
--   INDEX `fk_category_has_manga_category1_idx` (`category_idcategory` ASC) VISIBLE,
--   CONSTRAINT `fk_category_has_manga_category1`
--     FOREIGN KEY (`category_idcategory`)
--     REFERENCES `chuko_manga_db`.`category` (`id_category`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_category_has_manga_manga1`
--     FOREIGN KEY (`manga_id`)
--     REFERENCES `chuko_manga_db`.`manga` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`favorite_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`favorite_user` (
  `user_id` INT NOT NULL,
  `advert_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `advert_id`),
  INDEX `fk_user_has_advert_advert1_idx` (`advert_id` ASC) VISIBLE,
  INDEX `fk_user_has_advert_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_advert_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chuko_manga_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_advert_advert1`
    FOREIGN KEY (`advert_id`)
    REFERENCES `chuko_manga_db`.`advert` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`address_has_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`address_has_user` (
  `address_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`address_id`, `user_id`),
  INDEX `fk_address_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_address_has_user_address1_idx` (`address_id` ASC) VISIBLE,
  CONSTRAINT `fk_address_has_user_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `chuko_manga_db`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_address_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `chuko_manga_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `chuko_manga_db`.`advert_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chuko_manga_db`.`advert_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_path` VARCHAR(255) NOT NULL,
  `is_primary` TINYINT NOT NULL,
  `advert_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_advert_image_advert1_idx` (`advert_id` ASC) VISIBLE,
  CONSTRAINT `fk_advert_image_advert1`
    FOREIGN KEY (`advert_id`)
    REFERENCES `chuko_manga_db`.`advert` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- CREATE TABLE search_query (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `query` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE = InnoDB;