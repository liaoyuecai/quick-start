package org.quick.modules.auth.dao;

import org.apache.ibatis.annotations.Param;
import org.quick.modules.auth.bean.sysUserRole;
import org.quick.modules.auth.bean.sysUserRoleExample;

import java.util.List;

public interface sysUserRoleMapper {
    long countByExample(sysUserRoleExample example);

    int deleteByExample(sysUserRoleExample example);

    int deleteByPrimaryKey(String id);

    int insert(sysUserRole record);

    int insertSelective(sysUserRole record);

    List<sysUserRole> selectByExample(sysUserRoleExample example);

    sysUserRole selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") sysUserRole record, @Param("example") sysUserRoleExample example);

    int updateByExample(@Param("record") sysUserRole record, @Param("example") sysUserRoleExample example);

    int updateByPrimaryKeySelective(sysUserRole record);

    int updateByPrimaryKey(sysUserRole record);
}