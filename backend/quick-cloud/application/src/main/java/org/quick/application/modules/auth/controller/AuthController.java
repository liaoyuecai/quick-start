package org.quick.application.modules.auth.controller;

import org.quick.application.modules.auth.bean.SysUser;
import org.quick.application.modules.auth.service.AuthService;
import org.quick.application.modules.auth.view.SysUserView;
import org.quick.application.universal.ResponseMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@RequestMapping("/auth")
public class AuthController {

    /**
     * 用户缓存,应用中应该放在缓存服务器中,比如redis
     */
    static Map<String,SysUserView> userMap = new ConcurrentHashMap<>();

    @Autowired
    AuthService authService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg login(@RequestBody SysUser user) {
        SysUserView userView = authService.findUserView(user);
        if (userView!=null){
            userMap.put(userView.getToken(),userView);
            return ResponseMsg.success(userView);
        }
        return ResponseMsg.error("用户名或密码错误!");
    }


}
