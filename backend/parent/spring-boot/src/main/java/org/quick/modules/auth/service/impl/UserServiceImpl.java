package org.quick.modules.auth.service.impl;


import org.quick.domain.bean.SysUser;
import org.quick.domain.dao.SysUserMapper;
import org.quick.modules.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(value = "txManager")
public class UserServiceImpl implements UserService {

    @Autowired
    SysUserMapper userMapper;

    @Override
    public SysUser findByLoginName(String name) {
        return userMapper.selectByLoginName(name);
    }
}
