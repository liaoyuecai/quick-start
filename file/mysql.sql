/*
Navicat MySQL Data Transfer

Source Server         : my
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : rass-v2

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-07-11 17:48:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for base_community
-- ----------------------------
DROP TABLE IF EXISTS `base_community`;
CREATE TABLE `base_community` (
  `id` varchar(36) NOT NULL COMMENT '36位uuid,方便水平分表',
  `community_name` varchar(100) DEFAULT NULL COMMENT '楼盘名称',
  `province_id` varchar(36) DEFAULT NULL COMMENT '省id',
  `province_name` varchar(20) DEFAULT NULL COMMENT '省名称',
  `city_id` varchar(36) DEFAULT NULL COMMENT '市ID',
  `city_name` varchar(20) DEFAULT NULL COMMENT '城市名称',
  `district_id` varchar(36) DEFAULT NULL COMMENT '区id',
  `district_name` varchar(20) DEFAULT NULL COMMENT '区名称',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `is_special` int(1) DEFAULT NULL COMMENT '是否特殊，1是0否',
  `is_confirm` int(1) DEFAULT NULL COMMENT '是否确认，1是0否',
  `is_deleted` int(1) DEFAULT NULL COMMENT '是否删除，1是0否',
  `community_other_name` varchar(255) DEFAULT NULL COMMENT '楼盘别名',
  `other_address` varchar(1024) DEFAULT NULL COMMENT '其它地址',
  `rong_ji_lv` varchar(10) DEFAULT NULL COMMENT '容积率',
  `lv_hua_lv` varchar(10) DEFAULT NULL COMMENT '绿化率',
  `kai_fa_shang` varchar(100) DEFAULT NULL COMMENT '开发商',
  `ping_pai_shang` varchar(100) DEFAULT NULL COMMENT '品牌商',
  `wu_guan_gong_si` varchar(100) DEFAULT NULL COMMENT '物管公司',
  `wu_guan_fei` varchar(10) DEFAULT NULL COMMENT '物管费',
  `wu_guan_dian_hua` varchar(20) DEFAULT NULL COMMENT '物管电话',
  `jian_zhu_lei_bie` varchar(100) DEFAULT NULL COMMENT '建筑类别',
  `zhan_di_mian_ji` varchar(10) DEFAULT NULL COMMENT '占地面积',
  `jian_zhu_mian_ji` varchar(10) DEFAULT NULL COMMENT '建筑面积',
  `zong_hu_shu` varchar(10) DEFAULT NULL COMMENT '总户数',
  `hu_xing` varchar(20) DEFAULT NULL COMMENT '户型',
  `lou_dong_zong_shu` varchar(10) DEFAULT NULL COMMENT '楼栋总数',
  `che_wei_shu` varchar(10) DEFAULT NULL COMMENT '车位数',
  `jian_zhu_jie_gou` varchar(50) DEFAULT NULL COMMENT '建筑结构',
  `jian_zhu_nian_dai` varchar(20) DEFAULT NULL COMMENT '建筑年代',
  `chan_quan_nian_dai` varchar(20) DEFAULT NULL COMMENT '产权年代',
  `wu_ye_ping_zhi` varchar(255) DEFAULT NULL COMMENT '物业品质',
  `you_wu_dian_ti` int(1) DEFAULT NULL COMMENT '1有电梯0没电梯-1部分',
  `zhu_li_wu_ye_ping_zhi` varchar(255) DEFAULT NULL COMMENT '主力物业品质',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `jian_zhu_mi_du` varchar(10) DEFAULT NULL,
  `longitude` double(10,6) DEFAULT NULL COMMENT '经度',
  `latitude` double(10,6) DEFAULT NULL COMMENT '纬度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='楼盘基础表';

-- ----------------------------
-- Table structure for base_community_builder
-- ----------------------------
DROP TABLE IF EXISTS `base_community_builder`;
CREATE TABLE `base_community_builder` (
  `id` varchar(36) NOT NULL,
  `community_id` varchar(36) DEFAULT NULL COMMENT '楼盘ID',
  `community_name` varchar(100) DEFAULT NULL COMMENT '楼盘名称',
  `builder_name` varchar(100) DEFAULT NULL COMMENT '楼栋名称',
  `cell` varchar(100) DEFAULT NULL COMMENT '单元数',
  `total_floor` int(11) DEFAULT NULL COMMENT '总楼层',
  `over_ground_floor` int(11) DEFAULT NULL COMMENT '地上层数',
  `under_ground_floor` int(11) DEFAULT NULL COMMENT '地下层数',
  `floor_room_no` int(11) DEFAULT NULL COMMENT '平层数量',
  `has_elevator` int(1) DEFAULT NULL COMMENT '有无电梯(1有0无)',
  `cargo_lift` int(11) DEFAULT NULL COMMENT '货梯数',
  `passenger_lift` int(11) DEFAULT NULL COMMENT '客梯数',
  `lift_brand` varchar(100) DEFAULT NULL COMMENT '电梯品牌',
  `toward` varchar(20) DEFAULT NULL COMMENT '朝向东,东北,东南,南,西,西北,西南,北',
  `building_quality` varchar(100) DEFAULT NULL COMMENT '物业品质',
  `views` varchar(100) DEFAULT NULL COMMENT '景观',
  `data_src` varchar(100) DEFAULT NULL COMMENT '数据来源',
  `build_time` varchar(20) DEFAULT NULL COMMENT '建筑年代',
  `wall_type` varchar(100) DEFAULT NULL COMMENT '外墙装修',
  `build_struct` varchar(100) DEFAULT NULL COMMENT '建筑结构',
  `std_floor_room_no` int(11) DEFAULT NULL COMMENT '标准层户数',
  `remark` varchar(1024) DEFAULT NULL COMMENT '备注',
  `is_confirm` int(1) DEFAULT NULL COMMENT '是否确认，1是0否',
  `address` varchar(255) DEFAULT NULL COMMENT '楼栋地址',
  `is_deleted` int(1) DEFAULT '0' COMMENT '是否删除，1是0否',
  `ctime` varchar(20) DEFAULT NULL COMMENT '创建数据',
  `update_time` varchar(20) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='楼栋表';

-- ----------------------------
-- Table structure for base_community_door
-- ----------------------------
DROP TABLE IF EXISTS `base_community_door`;
CREATE TABLE `base_community_door` (
  `id` varchar(36) NOT NULL,
  `community_id` varchar(36) DEFAULT NULL COMMENT '楼盘ID',
  `community_name` varchar(100) DEFAULT NULL COMMENT '楼盘名称',
  `door_name` varchar(100) DEFAULT NULL COMMENT '门牌名称',
  `build_id` varchar(36) DEFAULT NULL COMMENT '楼栋ID',
  `build_name` varchar(100) DEFAULT NULL COMMENT '楼栋名称',
  `area` decimal(10,0) DEFAULT NULL COMMENT '房间面积',
  `floor` smallint(6) DEFAULT NULL COMMENT '所在楼层',
  `price` decimal(10,0) DEFAULT NULL COMMENT '房间价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='门牌表';

-- ----------------------------
-- Table structure for base_community_manual_price_log
-- ----------------------------
DROP TABLE IF EXISTS `base_community_manual_price_log`;
CREATE TABLE `base_community_manual_price_log` (
  `id` varchar(64) NOT NULL,
  `community_name` varchar(100) DEFAULT NULL COMMENT '小区名称，冗余字段',
  `community_id` varchar(36) DEFAULT NULL COMMENT '小区id',
  `ctime` datetime DEFAULT NULL COMMENT '提交时间',
  `submit_price` decimal(10,2) DEFAULT NULL COMMENT '提交价格',
  `property_type` varchar(20) DEFAULT NULL COMMENT '物业类型',
  `property_type_dict_id` varbinary(36) DEFAULT NULL COMMENT '物业类型字典ID',
  `month` varchar(20) DEFAULT NULL COMMENT '提交月份,如2016-08',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小区人工价格提交历史表';

-- ----------------------------
-- Table structure for base_community_snapshot_price
-- ----------------------------
DROP TABLE IF EXISTS `base_community_snapshot_price`;
CREATE TABLE `base_community_snapshot_price` (
  `id` varchar(36) NOT NULL,
  `community_name` varchar(100) DEFAULT NULL COMMENT '小区名称，冗余字段',
  `community_id` varchar(36) DEFAULT NULL COMMENT '小区id',
  `property_type` varchar(50) DEFAULT NULL COMMENT '物业类型',
  `property_type_dict_id` varchar(36) DEFAULT NULL COMMENT '物业类型字典id',
  `month` varchar(20) DEFAULT NULL COMMENT '月份，如2016-08',
  `sys_price` decimal(10,2) DEFAULT NULL COMMENT '系统推荐价格',
  `last_manual_price` decimal(10,2) DEFAULT NULL COMMENT '本月最后一次人工提交价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='楼盘每月价格快照，包括系统价格与最后一次人工提交价格';

-- ----------------------------
-- Table structure for base_dict
-- ----------------------------
DROP TABLE IF EXISTS `base_dict`;
CREATE TABLE `base_dict` (
  `id` varchar(36) NOT NULL,
  `dict_key` varchar(100) DEFAULT NULL COMMENT 'key值',
  `dict_value` varchar(100) DEFAULT NULL COMMENT 'value值',
  `dict_parent_id` varchar(36) DEFAULT NULL COMMENT '父值id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for base_geo
-- ----------------------------
DROP TABLE IF EXISTS `base_geo`;
CREATE TABLE `base_geo` (
  `id` varchar(36) NOT NULL,
  `geo_name` varchar(50) DEFAULT NULL COMMENT '省\\市\\区名称',
  `geo_type` set('province','city','district') DEFAULT '' COMMENT '类型',
  `parent_geo_id` varchar(36) DEFAULT NULL COMMENT '父级id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` varchar(36) NOT NULL,
  `permission_name` varchar(50) DEFAULT NULL COMMENT '权限名称',
  `url` varchar(100) DEFAULT NULL COMMENT '权限对应的url,请以/开头',
  `parent_id` varchar(36) DEFAULT NULL COMMENT '父权限id',
  `permission_type` set('menu') DEFAULT 'menu' COMMENT '默认是menu，将来可以拓展为button等细粒度权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(36) NOT NULL,
  `role_name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Table structure for sys_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `id` varchar(36) NOT NULL,
  `role_id` varchar(36) DEFAULT NULL COMMENT '角色id',
  `permission_id` varchar(36) DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色-权限对应关系表';

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(50) NOT NULL COMMENT '用户名称',
  `login_name` varchar(50) DEFAULT NULL COMMENT '登录名',
  `pwd` varchar(32) DEFAULT NULL COMMENT '密码32位MD5，大写',
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `role_id` varchar(36) DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户-角色表';
