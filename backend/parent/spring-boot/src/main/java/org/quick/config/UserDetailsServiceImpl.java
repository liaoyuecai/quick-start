package org.quick.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
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

    private Logger logger = LoggerFactory.getLogger(getClass());


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("用户的用户名: {}", username);

        String password = passwordEncoder.encode("123456");
        logger.info("password: {}", password);

        // 参数分别是：用户名，密码，用户权限
        User user = new User(username, password, AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
        /**
         * 正常项目这里的user应该是从数据库获取
         * User user = userService.findByUserName(username);
         */
        if (user != null) {
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();      //权限列表
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");//新建ADMIN角色的权限
            grantedAuthorities.add(grantedAuthority);
            return new User(user.getUsername(), user.getPassword(), grantedAuthorities);//生成系统用户
        } else {
            throw new UsernameNotFoundException("admin: " + username + " do not exist!");
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        //密码需要加密，这里使用的内建
        return new BCryptPasswordEncoder();
    }
}
