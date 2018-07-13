package org.quick.modules.auth.service;


import org.quick.domain.bean.SysUser;

public interface UserService {
    SysUser findByLoginName(String userName);
}
