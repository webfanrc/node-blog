SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `blog_db`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `content` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `blog_db`
-- ----------------------------
BEGIN;
INSERT INTO `blog` VALUES ('1', 'Google', 'https://www.google.cm/'), ('2', '淘宝', 'https://www.taobao.com/');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
