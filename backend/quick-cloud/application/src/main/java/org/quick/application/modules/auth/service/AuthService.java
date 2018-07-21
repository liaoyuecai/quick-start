package org.quick.application.modules.auth.service;


import org.quick.application.modules.auth.bean.SysPermission;
import org.quick.application.modules.auth.bean.SysRole;
import org.quick.application.modules.auth.bean.SysUser;

import java.util.List;

public interface AuthService {
    SysUser findUserByLoginName(String userName);

    List<SysRole> findRolesByUserId(String userId);

    List<SysPermission> findPermissionsByRole(List<String> roleTags);
}
