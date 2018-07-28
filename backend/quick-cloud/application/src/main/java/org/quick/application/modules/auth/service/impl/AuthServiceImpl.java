package org.quick.application.modules.auth.service.impl;


import org.apache.commons.lang.StringUtils;
import org.quick.application.exception.DataException;
import org.quick.application.modules.auth.bean.SysPermission;
import org.quick.application.modules.auth.bean.SysRole;
import org.quick.application.modules.auth.bean.SysUser;
import org.quick.application.modules.auth.bean.SysUserExample;
import org.quick.application.modules.auth.dao.SysPermissionMapper;
import org.quick.application.modules.auth.dao.SysRoleMapper;
import org.quick.application.modules.auth.dao.SysUserMapper;
import org.quick.application.modules.auth.service.AuthService;
import org.quick.application.modules.auth.view.MenuView;
import org.quick.application.modules.auth.view.SysUserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        if (!permissions.isEmpty()) {
            userView.setMenu(getMenu(permissions));
            List<String> p_str = new ArrayList<>();
            permissions.forEach(i -> p_str.add(i.getUrl()));
            userView.setPermissions(p_str);
        }
        return userView;
    }

    /**
     * 将权限数据转换为菜单树结构
     *
     * @param permissions
     * @return
     */
    private List<MenuView> getMenu(List<SysPermission> permissions) {
        List<MenuView> menu = new ArrayList<>();
        Map<String, List<SysPermission>> children = new HashMap<>();
        for (SysPermission permission : permissions) {
            if (StringUtils.isEmpty(permission.getParentId()))
                menu.add(new MenuView(permission));
            else {
                if (!children.containsKey(permission.getParentId()))
                    children.put(permission.getParentId(), new ArrayList<>());
                children.get(permission.getParentId()).add(permission);
            }

        }
        if (menu.isEmpty())
            return null;
        for (MenuView view : menu) {
            setChildren(view, children);
        }
        return menu;
    }

    /**
     * 递归写入子集元素
     *
     * @param view
     * @param children
     */
    private void setChildren(MenuView view, Map<String, List<SysPermission>> children) {
        MenuView childView;
        if (children.containsKey(view.getKey())) {
            List<SysPermission> permissions = children.get(view.getKey());
            for (SysPermission permission : permissions) {
                childView = new MenuView(permission);
                setChildren(childView, children);
                view.addChild(childView);
            }
        }
    }

}
