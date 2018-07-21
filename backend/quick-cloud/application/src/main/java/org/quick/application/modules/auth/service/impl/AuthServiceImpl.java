package org.quick.application.modules.auth.service.impl;


import org.quick.application.modules.auth.bean.SysPermission;
import org.quick.application.modules.auth.bean.SysRole;
import org.quick.application.modules.auth.bean.SysUser;
import org.quick.application.modules.auth.bean.SysUserExample;
import org.quick.application.modules.auth.dao.SysPermissionMapper;
import org.quick.application.modules.auth.dao.SysRoleMapper;
import org.quick.application.modules.auth.dao.SysUserMapper;
import org.quick.application.modules.auth.service.AuthService;
import org.quick.application.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(value = "txManager")
public class AuthServiceImpl implements AuthService {

    @Autowired
    SysUserMapper userMapper;
    @Autowired
    SysRoleMapper roleMapper;
    @Autowired
    SysPermissionMapper permissionMapper;

    @Override
    public SysUser findUserByLoginName(String name) {
        SysUserExample example = new SysUserExample();
        example.createCriteria().andLoginNameEqualTo(name);
        List<SysUser> users = userMapper.selectByExample(example);
        if (users.size()>1)
            throw new RuntimeException(new DataException("存在多个用户登录名相同："+name));
        else if (users.size() == 1)
            return users.get(0);
        return null;
    }

    @Override
    public List<SysRole> findRolesByUserId(String userId) {
        return roleMapper.selectByUserId(userId);
    }

    @Override
    public List<SysPermission> findPermissionsByRole(List<String> roleTags) {
        return permissionMapper.selectByRole(roleTags);
    }
}
