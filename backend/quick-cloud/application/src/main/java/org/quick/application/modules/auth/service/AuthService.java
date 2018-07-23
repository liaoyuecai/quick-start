package org.quick.application.modules.auth.service;


import org.quick.application.modules.auth.bean.SysUser;
import org.quick.application.modules.auth.view.SysUserView;

public interface AuthService {
    SysUserView findUserView(SysUser user);
}
