package org.quick.modules.auth.service;


import org.quick.modules.auth.bean.SysRole;
import org.quick.modules.auth.bean.SysUser;

import java.util.List;

public interface AuthService {
    SysUser findUserByLoginName(String userName);

    List<SysRole> findRolesByUserId(String userId);
}
