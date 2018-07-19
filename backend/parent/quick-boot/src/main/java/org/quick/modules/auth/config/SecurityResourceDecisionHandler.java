package org.quick.modules.auth.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;

@Component("securityResourceDecisionHandler")
public class SecurityResourceDecisionHandler {

    /**
//     * 保存的是url以及url所需要的权限
//     */
//    private static final Map<String, List<GrantedAuthority>> URL_AUTHS = new ConcurrentHashMap<>();
//
//    static {
//        URL_AUTHS.put("/xx", Arrays.asList(new SimpleGrantedAuthority("01")));
//        URL_AUTHS.put("/xx/x", Arrays.asList(new SimpleGrantedAuthority("01")));
//        URL_AUTHS.put("/yy", Arrays.asList(new SimpleGrantedAuthority("0102")));
//        URL_AUTHS.put("/zz/**", Arrays.asList(new SimpleGrantedAuthority("010201")));
//    }
//    AntPathMatcher pathMatcher = new AntPathMatcher();

    /**
     * 自定义决策
     *
     * @param authentication
     *            认证对象
     * @param request
     *            请求的request对象
     * @return true:有权限访问 false:无权限访问
     */
    public boolean auth(Authentication authentication, HttpServletRequest request) {
        System.out.println(222);System.out.println(222);
        String uri = request.getRequestURI().replace(request.getContextPath(), "");
//        GrantedAuthorityauthentication.getAuthorities()
//        for (Entry<String, List<GrantedAuthority>> entry : URL_AUTHS.entrySet()) {
//            if (pathMatcher.match(entry.getKey(), uri)) {
//                Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//                for (GrantedAuthority grantedAuthority : authorities) {
//                    if (entry.getValue().contains(grantedAuthority)) {
//                        return true;
//                    }
//                }
//                log.warn("当前访问的uri:{},需要的权限是:{},当前用户无此权限.", uri, entry.getValue());
//                return false;
//            }
//        }

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority grantedAuthority : authorities) {
            System.out.println(authentication.getPrincipal());
//            if (entry.getValue().contains(grantedAuthority)) {
//                return true;
//            }
        }

//        // 访问的是没有配置权限的功能，必须要登录用户才可以进行访问
//        if (authentication.isAuthenticated() && !Objects.equals("anonymousUser", authentication.getPrincipal())) {
//            return true;
//        }

        // 没有登录，直接返回false
        return false;
    }
}