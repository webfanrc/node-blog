SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` TEXT(21845),
  `user_email` TEXT(21845),
  `user_message` TEXT(21845),
  `user_website` TEXT(21845),
  `message_for` TEXT(28145),
  `send_date` DATETIME,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;