package org.quick.modules.auth.config;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;


/**
 * security拦截器,用户返回登录用户角色
 */
@Service
public class SecurityMetadataSourceAuthService implements
        FilterInvocationSecurityMetadataSource {


    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //判断是否登录
        if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Collection<ConfigAttribute> configAttributes = new ArrayList();
            userDetails.getAuthorities().forEach(i -> configAttributes.add(new SecurityConfig(i.getAuthority())));
            //返回登录用户角色
            return configAttributes;
        }
        return null;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}