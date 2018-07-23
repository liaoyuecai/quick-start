package org.quick.application.modules.auth.service.impl;


import org.quick.application.exception.DataException;
import org.quick.application.modules.auth.bean.SysPermission;
import org.quick.application.modules.auth.bean.SysRole;
import org.quick.application.modules.auth.bean.SysUser;
import org.quick.application.modules.auth.bean.SysUserExample;
import org.quick.application.modules.auth.dao.SysPermissionMapper;
import org.quick.application.modules.auth.dao.SysRoleMapper;
import org.quick.application.modules.auth.dao.SysUserMapper;
import org.quick.application.modules.auth.service.AuthService;
import org.quick.application.modules.auth.view.SysUserView;
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
    public SysUserView findUserView(SysUser user) {
        SysUserExample example = new SysUserExample();
        example.createCriteria().andLoginNameEqualTo(user.getLoginName());
        List<SysUser> users = userMapper.selectByExample(example);
        SysUserView userView = new SysUserView();
        if (users.size() > 1)
            throw new RuntimeException(new DataException("存在多个用户登录名相同：" + user.getLoginName()));
        else if (users.size() == 1)
            userView.setUser(users.get(0));
        else
            return null;
        List<SysRole> roles = roleMapper.selectByUserId(userView.getUser().getId());
        userView.setRoles(roles);
        List<SysPermission> permissions = permissionMapper.selectByRole(roles);
        userView.setPermissions(permissions);
        return userView;
    }
}
