package org.quick.modules.auth.config;

import org.quick.modules.auth.bean.SysRole;
import org.quick.modules.auth.bean.SysUser;
import org.quick.modules.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        SysUser user = authService.findUserByLoginName(userName);
        if (user != null) {
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            List<SysRole> roles = authService.findRolesByUserId(user.getId());
            if (roles!=null) {
                for (SysRole role : roles)
                    grantedAuthorities.add(new SimpleGrantedAuthority(role.getTag()));
            }
            return new User(user.getUserName(), passwordEncoder.encode(user.getPwd()), grantedAuthorities);//生成系统用户
        } else {
            throw new UsernameNotFoundException("admin: " + userName + " do not exist!");
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        //密码需要加密，这里使用的内建
        return new BCryptPasswordEncoder();
    }
}
