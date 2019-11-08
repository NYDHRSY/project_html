-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2019-11-08 06:08:24
-- 服务器版本： 5.7.26
-- PHP 版本： 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `software`
--

-- --------------------------------------------------------

--
-- 表的结构 `alter`
--

DROP TABLE IF EXISTS `alter`;
CREATE TABLE IF NOT EXISTS `alter` (
  `uid` varchar(20) DEFAULT NULL,
  `cid` int(1) DEFAULT NULL,
  `aid` int(1) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `alter2`
--

DROP TABLE IF EXISTS `alter2`;
CREATE TABLE IF NOT EXISTS `alter2` (
  `aid2` int(1) NOT NULL,
  `uid` varchar(1) DEFAULT NULL,
  `tid` int(1) DEFAULT NULL,
  PRIMARY KEY (`aid2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `class`
--

DROP TABLE IF EXISTS `class`;
CREATE TABLE IF NOT EXISTS `class` (
  `cid` int(1) NOT NULL,
  `ctitle` varchar(100) NOT NULL,
  `start` int(1) NOT NULL,
  `end` int(1) NOT NULL,
  `cover_url` varchar(100) DEFAULT NULL,
  `home_url` varchar(100) DEFAULT NULL,
  `syllabus_url` varchar(100) NOT NULL,
  `modles_url` varchar(100) NOT NULL,
  `did` int(1) NOT NULL,
  `fid` int(1) DEFAULT NULL,
  `uid` varchar(20) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `score` int(1) DEFAULT NULL,
  `day` int(1) NOT NULL,
  `ctext` varchar(1000) DEFAULT NULL,
  `weekdays` varchar(100) NOT NULL,
  PRIMARY KEY (`cid`,`uid`,`day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `class`
--

INSERT INTO `class` (`cid`, `ctitle`, `start`, `end`, `cover_url`, `home_url`, `syllabus_url`, `modles_url`, `did`, `fid`, `uid`, `nickname`, `score`, `day`, `ctext`, `weekdays`) VALUES
(1001, 'Software Engineering', 1, 8, '../markdown/1001cov.jpg', '../markdown/1001home.md', '../markdown/1001syl.md', '../markdown/1001mod.md', 0, NULL, '1028', NULL, NULL, 2, 'this is Software Engineering', '2,5'),
(1001, 'Software Engineering', 1, 8, '../markdown/1001cov.jpg', '../markdown/1001home.md', '../markdown/1001syl.md', '../markdown/1001mod.md', 0, NULL, '2001', NULL, NULL, 2, 'this is Software Engineering', '2,5'),
(1001, 'Software Engineering', 1, 8, '../markdown/1001cov.jpg', '../markdown/1001home.md', '../markdown/1001syl.md', '../markdown/1001mod.md', 0, NULL, '2001', NULL, NULL, 5, 'this is Software Engineering', '2,5'),
(1002, 'Software Engineering and Practicing', 1, 4, '../markdown/1002cov.jpg', '../markdown/1002home.md', '../markdown/1002syl.md', '../markdown/1002mod.md', 0, NULL, '1026', NULL, NULL, 3, 'this is Software Engineering and Practicing', '3,5'),
(1002, 'Software Engineering and Practicing', 1, 4, '../markdown/1002cov.jpg', '../markdown/1002home.md', '../markdown/1002syl.md', '../markdown/1002mod.md', 0, NULL, '1026', NULL, NULL, 5, 'this is Software Engineering and Practicing', '3,5'),
(1002, 'Software Engineering and Practicing', 1, 4, '../markdown/1002cov.jpg', '../markdown/1002home.md', '../markdown/1002syl.md', '../markdown/1002mod.md', 0, NULL, '2001', NULL, NULL, 3, 'this is Software Engineering and Practicing', '3,5'),
(1002, 'Software Engineering and Practicing', 1, 4, '../markdown/1002cov.jpg', '../markdown/1002home.md', '../markdown/1002syl.md', '../markdown/1002mod.md', 0, NULL, '2001', NULL, NULL, 5, 'this is Software Engineering and Practicing', '3,5'),
(1003, 'English III', 1, 8, '../markdown/1003cov.jpg', '../markdown/1003home.md', '../markdown/1003syl.md', '../markdown/1003mod.md', 0, NULL, '1026', NULL, NULL, 1, 'this is English III', '1,4'),
(1003, 'English III', 1, 8, '../markdown/1003cov.jpg', '../markdown/1003home.md', '../markdown/1003syl.md', '../markdown/1003mod.md', 0, NULL, '1026', NULL, NULL, 4, 'this is English III', '1,4'),
(1003, 'English III', 1, 8, '../markdown/1003cov.jpg', '../markdown/1003home.md', '../markdown/1003syl.md', '../markdown/1003mod.md', 0, NULL, '2001', NULL, NULL, 1, 'this is English III', '1,4'),
(1003, 'English III', 1, 8, '../markdown/1003cov.jpg', '../markdown/1003home.md', '../markdown/1003syl.md', '../markdown/1003mod.md', 0, NULL, '2001', NULL, NULL, 4, 'this is English III', '1,4');

-- --------------------------------------------------------

--
-- 表的结构 `discussion`
--

DROP TABLE IF EXISTS `discussion`;
CREATE TABLE IF NOT EXISTS `discussion` (
  `did` int(1) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) DEFAULT NULL,
  `cid` varchar(20) DEFAULT NULL,
  `time` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`did`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `discussion`
--

INSERT INTO `discussion` (`did`, `uid`, `cid`, `time`, `name`, `content`) VALUES
(1, '1024', '1000', '2019-10-30 23:08:28', 'student1', 'woshiyigexiaobendan'),
(2, '1024', '1000', '2019-10-30 23:08:38', 'student1', 'tashiyige1ixaobendan'),
(3, '1024', '1001', '2019-10-31 03:20:35', 'student1', 'qwe');

-- --------------------------------------------------------

--
-- 表的结构 `inbox`
--

DROP TABLE IF EXISTS `inbox`;
CREATE TABLE IF NOT EXISTS `inbox` (
  `mid` int(10) NOT NULL AUTO_INCREMENT,
  `uid_ano` varchar(20) DEFAULT NULL,
  `uid` varchar(20) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `inbox`
--

INSERT INTO `inbox` (`mid`, `uid_ano`, `uid`, `time`, `name`, `title`, `content`) VALUES
(1, '1024', '1024', '2019-10-30 22:57:33', 'student1', 'hehe', 'hehehee'),
(2, '1024', '1024', '2019-10-30 23:08:06', 'student1', 'second', 'adskldjfkja'),
(3, '1024', '1024', '2019-10-31 03:22:10', 'student1', 'hello!', 'hello world!');

-- --------------------------------------------------------

--
-- 表的结构 `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `qid` varchar(20) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `tid` varchar(100) DEFAULT NULL,
  `cid` int(1) NOT NULL,
  `question_url` varchar(100) DEFAULT NULL,
  `ans` varchar(2) DEFAULT NULL,
  `choiceA` varchar(100) DEFAULT NULL,
  `choiceB` varchar(100) DEFAULT NULL,
  `choiceC` varchar(100) DEFAULT NULL,
  `choiceD` varchar(100) DEFAULT NULL,
  `score` int(1) NOT NULL,
  `question_type` int(1) DEFAULT NULL,
  `qname` varchar(100) DEFAULT NULL,
  `done` int(1) DEFAULT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `std` varchar(2) DEFAULT NULL,
  `std_score` int(1) NOT NULL,
  PRIMARY KEY (`qid`,`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `question`
--

INSERT INTO `question` (`qid`, `uid`, `tid`, `cid`, `question_url`, `ans`, `choiceA`, `choiceB`, `choiceC`, `choiceD`, `score`, `question_type`, `qname`, `done`, `title`, `std`, `std_score`) VALUES
('1001010', '1028', '100101', 1001, NULL, '0', 'Software suffers from exposure to hostile environments', 'Defects are more likely to arise after software has been used often', 'Multiple change requests introduce errors in component interactions', 'Software spare parts become harder to order', 0, 0, NULL, NULL, 'Software deteriorates rather than wears out because', 'C', 10),
('1001010', '2001', '100101', 1001, NULL, '0', 'Software suffers from exposure to hostile environments', 'Defects are more likely to arise after software has been used often', 'Multiple change requests introduce errors in component interactions', 'Software spare parts become harder to order', 0, 0, NULL, NULL, 'Software deteriorates rather than wears out because', 'C', 10),
('1001011', '1028', '100101', 1001, NULL, '0', 'A)Why does computer hardware cost so much?', 'B)Why does software take a long time to finish?', 'C)Why does it cost so much to develop a piece of software?', 'D)Why cannot software errors be removed from products prior to delivery?', 0, 0, NULL, NULL, 'Which question no longer concerns the modern software engineer?', 'A', 10),
('1001011', '2001', '100101', 1001, NULL, '0', 'A)Why does computer hardware cost so much?', 'B)Why does software take a long time to finish?', 'C)Why does it cost so much to develop a piece of software?', 'D)Why cannot software errors be removed from products prior to delivery?', 0, 0, NULL, NULL, 'Which question no longer concerns the modern software engineer?', 'A', 10),
('1001020', '2001', '100102', 1001, NULL, '0', NULL, NULL, NULL, NULL, 0, 1, NULL, NULL, 'What do you think about the statement that \"Software engineering umbrella activities are only applied during theinitial phases of software development projects.\"?', NULL, 10),
('1001021', '2001', '100102', 1001, NULL, '0', NULL, NULL, NULL, NULL, 0, 1, NULL, NULL, 'Discribe the software engineer in your mind.', NULL, 10),
('1003010', '1026', '100301', 1003, NULL, '0', '1k', '2k', '1.5k', '2k-1', 0, 0, NULL, NULL, 'How much is the new airpods pro?', 'D', 10),
('1003010', '2001', '100301', 1003, NULL, '0', '1k', '2k', '1.5k', '2k-1', 0, 0, NULL, NULL, 'How much is the new airpods pro?', 'D', 10),
('1003011', '1026', '100301', 1003, NULL, '0', 'Red Sun', 'Green', 'Little apple', 'Song of 5 rings', 0, 0, NULL, NULL, 'What is the favorite song of WSJ?', 'D', 10),
('1003011', '2001', '100301', 1003, NULL, '0', 'Red Sun', 'Green', 'Little apple', 'Song of 5 rings', 0, 0, NULL, NULL, 'What is the favorite song of WSJ?', 'D', 10),
('1003020', '1026', '100302', 1003, NULL, '0', '', '', '', '', 0, 1, NULL, NULL, 'What do you think about the foreign news on HK?', '', 10),
('1003020', '2001', '100302', 1003, NULL, '0', NULL, NULL, NULL, NULL, 0, 1, NULL, NULL, 'What do you think about the foreign news on HK?', NULL, 10),
('1003030', '1026', '100303', 1003, NULL, '0', '', '', '', '', 0, 1, NULL, NULL, 'How would you feel when you GF break up with you?', '', 10),
('1003030', '2001', '100303', 1003, NULL, '0', NULL, NULL, NULL, NULL, 0, 1, NULL, NULL, 'How would you feel when you GF break up with you?', NULL, 10);

-- --------------------------------------------------------

--
-- 表的结构 `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `tid` varchar(20) NOT NULL,
  `tname` varchar(20) NOT NULL,
  `ttype` int(11) NOT NULL,
  `deadline` varchar(20) DEFAULT NULL,
  `score_total` int(1) DEFAULT NULL,
  `score_gained` int(1) DEFAULT NULL,
  `tcontent_url` varchar(100) DEFAULT NULL,
  `cid` int(1) DEFAULT NULL,
  `uid` varchar(20) NOT NULL,
  `done` int(1) DEFAULT NULL,
  PRIMARY KEY (`tid`,`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `test`
--

INSERT INTO `test` (`tid`, `tname`, `ttype`, `deadline`, `score_total`, `score_gained`, `tcontent_url`, `cid`, `uid`, `done`) VALUES
('100101', 'Chapter1-1', 0, '2019/11/15', 20, 0, NULL, 1001, '1028', 0),
('100101', 'Chapter1-1', 0, '2019/11/15', 20, 0, NULL, 1001, '2001', 0),
('100102', 'Chapter1-2', 1, '2019/11/15', 20, 0, '../test/100102/', 1001, '2001', 0),
('100301', 'Chapter1-1', 0, '2019/11/15', 20, 0, NULL, 1003, '1026', 0),
('100301', 'Chapter1-1', 0, '2019/11/15', 20, 0, '../test/100301/', 1003, '2001', 0),
('100302', 'Chapter1-2', 1, '2019/11/30', 10, 0, NULL, 1003, '1026', 0),
('100302', 'Chapter1-2', 1, '2019/11/30', 10, 0, NULL, 1003, '2001', 0),
('100303', 'Chapter1-3', 1, '1998/2/6', 10, 0, NULL, 1003, '1026', 0),
('100303', 'Chapter1-3', 1, '1998/2/6', 10, 0, '../test/100303/', 1003, '2001', 0);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `uid` varchar(20) NOT NULL DEFAULT '',
  `type` int(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `psw` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `type`, `name`, `psw`) VALUES
('1024', 2, 'student1', '123456'),
('1025', 2, 'student2', '234567'),
('1026', 2, 'student3', '123456'),
('3001', 0, 'admin1', '654321'),
('2001', 1, 'Teacher', '123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
