package org.quick.application.modules.auth.view;


import lombok.Data;
import org.quick.application.modules.auth.bean.SysPermission;
import org.quick.application.modules.auth.bean.SysRole;
import org.quick.application.modules.auth.bean.SysUser;

import java.util.List;
import java.util.UUID;

@Data
public class SysUserView {
    String token = UUID.randomUUID().toString();
    SysUser user;
    List<SysRole> roles;
    List<SysPermission> permissions;
}
