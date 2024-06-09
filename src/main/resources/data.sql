DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tittle` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `priority` VARCHAR(45) NULL,
  `dead_line` VARCHAR(45) NULL,
  `insert_date` DATE NULL,
  `dead_line_days` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));


INSERT INTO `tasks` (`id`,`tittle`, `status`, `type`, `priority`, `insert_date`) VALUES (1,'estudar ihc', 'concluido', 'livre', 'alta', '2024-04-27');
