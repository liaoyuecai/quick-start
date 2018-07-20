package org.quick.modules.auth.config;

import org.quick.modules.auth.bean.SysPermission;
import org.quick.modules.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
public class SecurityAccessDecision implements AccessDecisionManager {

    @Autowired
    AuthService authService;

    /**
     * 验证url是否能被当前角色访问
     * @param authentication
     * @param object
     * @param configAttributes
     * @throws AccessDeniedException
     * @throws InsufficientAuthenticationException
     */
    @Override
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {
        if(null== configAttributes || configAttributes.size() <=0) {
            return;
        }
        List<String> roleTags = new ArrayList<>();
        configAttributes.forEach(i->{roleTags.add(i.getAttribute());});
        List<SysPermission> permissions = authService.findPermissionsByRole(roleTags);
        HttpServletRequest request = ((FilterInvocation) object).getHttpRequest();
        if (permissions.contains(request.getRequestURI()))
            return;
        throw new AccessDeniedException("do not have permission");
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}
