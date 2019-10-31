SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `blog_db`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `content` TEXT(21845),
  `create_date` date,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `blog_db`
-- ----------------------------

--BEGIN;
--INSERT INTO `blog`
--(title, content, create_date)
--VALUES
--('Google', 'https://www.google.cm/', '1000-06-02'), ('淘宝', 'https://www.taobao.com/', '1000-06-02');
--COMMIT; SET FOREIGN_KEY_CHECKS = 1;
