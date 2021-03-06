-- CREATE SCHEMA IF NOT EXISTS `1001db` DEFAULT CHARACTER SET utf8; 
CREATE DATABASE 1001db;
CREATE TABLE IF NOT EXISTS `1001db`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Firstname` VARCHAR(45) NOT NULL,
  `Lastname` VARCHAR(45) NOT NULL,
  `University` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`));
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Messages` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `SenderUser_ID` INT NOT NULL,
  `ReceiverUser_ID` INT NOT NULL,
  `Text` LONGTEXT NOT NULL,
  `DateTime` DATETIME NOT NULL,
  PRIMARY KEY (`ID`, `SenderUser_ID`, `ReceiverUser_ID`),
  INDEX `fk_Users_has_Users_Users1_idx` (`ReceiverUser_ID` ASC),
  INDEX `fk_Users_has_Users_Users_idx` (`SenderUser_ID` ASC),
  UNIQUE INDEX `DateTime_UNIQUE` (`DateTime` ASC),
  CONSTRAINT `fk_Users_has_Users_Users`
    FOREIGN KEY (`SenderUser_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Users_Users1`
    FOREIGN KEY (`ReceiverUser_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Topics` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FatherCategory` VARCHAR(45) NULL,
  `TopicName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `TopicsName_UNIQUE` (`TopicName` ASC));
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`TypeInformations` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Type` VARCHAR(45) NOT NULL,
  `TimeInSec` INT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `Type_UNIQUE` (`Type` ASC));
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`ChallengeQuestions` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `QuestionText` LONGTEXT NOT NULL,
  `Answer_A` LONGTEXT NOT NULL,
  `Answer_B` LONGTEXT NOT NULL,
  `Answer_C` LONGTEXT NOT NULL,
  `Answer_D` LONGTEXT NOT NULL,
  `XPValue` INT NULL,
  `Topics_ID` INT NOT NULL,
  `Explanation` LONGTEXT NULL,
  PRIMARY KEY (`ID`, `Topics_ID`),
  INDEX `fk_ChallengeQuestions_Topics1_idx` (`Topics_ID` ASC),
  CONSTRAINT `fk_ChallengeQuestions_Topics1`
    FOREIGN KEY (`Topics_ID`)
    REFERENCES `1001db`.`Topics` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`QuestionTypeInformation` (
  `ChallengeQuestions_ID` INT NOT NULL,
  `TypeInformations_ID` INT NOT NULL,
  PRIMARY KEY (`ChallengeQuestions_ID`, `TypeInformations_ID`),
  INDEX `fk_TypeInformations_idx` (`TypeInformations_ID` ASC),
  CONSTRAINT `fk_QuestionTypeInformation_ChallengeQuestions1`
    FOREIGN KEY (`ChallengeQuestions_ID`)
    REFERENCES `1001db`.`ChallengeQuestions` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_TypeInformations`
    FOREIGN KEY (`TypeInformations_ID`)
    REFERENCES `1001db`.`TypeInformations` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`ExecutionTable` (
  `KEY` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`KEY`));
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Challenge` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `SenderProposal_ID` INT NOT NULL,
  `ReceiverProposal_ID` INT NULL,
  `Status` ENUM('WaitingOtherPlayer', 'Playing', 'Finished') NOT NULL,
  `Datetime` DATETIME NULL,
  PRIMARY KEY (`ID`),
  INDEX `Player1_idx` (`SenderProposal_ID` ASC),
  INDEX `Player2_idx` (`ReceiverProposal_ID` ASC),
  CONSTRAINT `Player1`
    FOREIGN KEY (`SenderProposal_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Player2`
    FOREIGN KEY (`ReceiverProposal_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
CREATE TABLE IF NOT EXISTS `1001db`.`PendingNotifications` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `NotificationJSON` LONGTEXT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `ID_idx` (`UserID` ASC) ,
  CONSTRAINT `UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`UsersActivities` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `Type` ENUM('Exit', 'Access') NOT NULL,
  `DateTime` DATETIME NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `ID_Users_idx` (`UserID` ASC),
  CONSTRAINT `ID_Users`
    FOREIGN KEY (`UserID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `1001db`.`ChallengeResults` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PlayerID` INT NOT NULL,
  `QuestionID` INT NOT NULL,
  `ChallengeID` INT NOT NULL,
  `XP` INT NOT NULL,
  `TimeInSec` INT NOT NULL,
  `Status` ENUM('NotAnswered', 'Answered') NULL,
  PRIMARY KEY (`ID`),
  INDEX `ID_User_idx` (`PlayerID` ASC),
  INDEX `ID_Question_idx` (`QuestionID` ASC),
  INDEX `ID_Challenge_idx` (`ChallengeID` ASC),
  CONSTRAINT `ID_User`
    FOREIGN KEY (`PlayerID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ID_Question`
    FOREIGN KEY (`QuestionID`)
    REFERENCES `1001db`.`ChallengeQuestions` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ID_Challenge`
    FOREIGN KEY (`ChallengeID`)
    REFERENCES `1001db`.`Challenge` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
-- ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `1001db`.`Industries` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` LONGTEXT NOT NULL,
  PRIMARY KEY (`ID`));
    
CREATE TABLE IF NOT EXISTS `1001db`.`CompanyTypes` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`));
  
CREATE TABLE IF NOT EXISTS `1001db`.`CompanySizes` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Quantity` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`));
  
  CREATE TABLE IF NOT EXISTS `1001db`.`Companies` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `WebSiteURL` LONGTEXT NOT NULL,
  `LinkedinProfileURL` LONGTEXT NOT NULL,
  `Logo_path` VARCHAR(45) NULL,
  `Industries_ID` INT NOT NULL,
  `CompanyTypes_ID` INT NOT NULL,
  `CompanySizes_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_Companies_Industries1_idx` (`Industries_ID` ASC),
  INDEX `fk_Companies_CompanyTypes1_idx` (`CompanyTypes_ID` ASC),
  INDEX `fk_Companies_CompanySizes1_idx` (`CompanySizes_ID` ASC),
  CONSTRAINT `fk_Companies_Industries1`
    FOREIGN KEY (`Industries_ID`)
    REFERENCES `1001db`.`Industries` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Companies_CompanyTypes1`
    FOREIGN KEY (`CompanyTypes_ID`)
    REFERENCES `1001db`.`CompanyTypes` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Companies_CompanySizes1`
    FOREIGN KEY (`CompanySizes_ID`)
    REFERENCES `1001db`.`CompanySizes` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);