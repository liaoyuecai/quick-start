package org.quick.modules.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

/**
 * spring security 配置
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)//开启角色验证
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private MyFilterSecurityInterceptor myFilterSecurityInterceptor;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                .loginPage("/auth/login")
                .failureForwardUrl("/auth/fail")
                .successForwardUrl("/auth/success").permitAll().and()
                .authorizeRequests()
                .antMatchers("/amchart/**",
                        "/bootstrap/**",
                        "/bootstrap-table/**",
                        "/css/**",
                        "/documentation/**",
                        "/jquery-validation/**",
                        "/fonts/**",
                        "/layer/**",
                        "/js/**",
                        "/pages/**",
                        "/plugins/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .logout().permitAll();
        http.csrf().disable();
        http.logout().logoutSuccessUrl("/auth/login");
        http.addFilterBefore(myFilterSecurityInterceptor, FilterSecurityInterceptor.class);
    }

}