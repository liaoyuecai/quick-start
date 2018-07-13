package org.quick.module;

import org.springframework.stereotype.Controller;


import com.alibaba.fastjson.JSONObject;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/")
public class MainController {


    //登录url，这里一定要用GET，因为我没有重新配置security的登录请求url，默认登录请求是POST的/login
    //因为我使用了thymeleaf模板，这里返回login即返回到resources/templates/login.html
    //如未使用模板（现在很多需要使用模板），需配置spring.mvc.view.prefix与spring.mvc.view.suffix
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "/login";
    }

    /**
     * 考虑到现在很多登录页面页面为异步请求，于是返回了一个json表示请求结果
     * 如需挑战则去掉ResponseBody注解，返回页面地址即可
     *
     * @param model
     * @return
     */
    @RequestMapping("/index")
    @ResponseBody
//    @PreAuthorize("hasRole('USER')")//匹配ADMIN角色（按照规则，录入权限时，需有一个前缀“ROLE_”，即“ROLE_ADMIN”），非ADMIN角色将被拒绝访问
    public String index(Model model, HttpServletRequest request) {
        SecurityContextImpl securityContextImpl = (SecurityContextImpl) request
                .getSession().getAttribute("SPRING_SECURITY_CONTEXT");
        JSONObject re = new JSONObject();
        re.put("status", true);
        return re.toJSONString();
    }

    @RequestMapping("/fail")
    @ResponseBody
    public String fail(Model model) {
        JSONObject re = new JSONObject();
        re.put("status", false);
        return re.toJSONString();
    }


}