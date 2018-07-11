package org.quick.domain.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.quick.domain.bean.sysUserRole;
import org.quick.domain.bean.sysUserRoleExample;

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