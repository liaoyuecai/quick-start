/*
Navicat MySQL Data Transfer

Source Server         : my
Source Server Version : 50712
Source Host           : 192.168.0.103:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-07-28 19:22:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` varchar(36) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `age` smallint(3) DEFAULT NULL,
  `sex` smallint(1) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '权限名称',
  `url` varchar(100) DEFAULT NULL COMMENT '权限对应的url,请以/开头',
  `parent_id` varchar(36) DEFAULT NULL COMMENT '父权限id',
  `icon` varchar(10) DEFAULT NULL COMMENT '图标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('1', '首页', 'community', null, 'home');
INSERT INTO `sys_permission` VALUES ('2', '数据展示', 'one', null, 'bars');
INSERT INTO `sys_permission` VALUES ('3', '菜单2', 'two', null, 'bars');
INSERT INTO `sys_permission` VALUES ('4', '表格', 'table', '2', 'bars');
INSERT INTO `sys_permission` VALUES ('5', '菜单1-2', 'one_two', '2', 'bars');
INSERT INTO `sys_permission` VALUES ('6', '菜单2-1', 'tools', '3', 'bars');

-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `tag` varchar(50) DEFAULT NULL COMMENT '角色标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', 'admin', 'ROLE_ADMIN');

-- ----------------------------
-- Table structure for `sys_role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `id` varchar(36) NOT NULL,
  `role_id` varchar(36) DEFAULT NULL COMMENT '角色id',
  `permission_id` varchar(36) DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色-权限对应关系表';

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
INSERT INTO `sys_role_permission` VALUES ('1', '1', '1');
INSERT INTO `sys_role_permission` VALUES ('2', '1', '2');
INSERT INTO `sys_role_permission` VALUES ('3', '1', '3');
INSERT INTO `sys_role_permission` VALUES ('4', '1', '4');
INSERT INTO `sys_role_permission` VALUES ('5', '1', '5');
INSERT INTO `sys_role_permission` VALUES ('6', '1', '6');
INSERT INTO `sys_role_permission` VALUES ('7', '1', '7');
INSERT INTO `sys_role_permission` VALUES ('8', '1', '8');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(36) NOT NULL,
  `user_name` varchar(50) NOT NULL COMMENT '用户名称',
  `login_name` varchar(50) DEFAULT NULL COMMENT '登录名',
  `password` varchar(32) DEFAULT NULL COMMENT '密码32位MD5，大写',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', 'admin', '1', '2018-07-16 10:15:15');

-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `role_id` varchar(36) DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户-角色表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('1', '1', '1');
