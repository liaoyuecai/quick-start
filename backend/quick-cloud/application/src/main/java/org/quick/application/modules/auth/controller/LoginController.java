package org.quick.application.modules.auth.controller;

import org.quick.application.modules.auth.bean.SysUser;
import org.quick.application.universal.ResponseMsg;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/auth")
public class LoginController {

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg login(HttpServletRequest request) {
        return ResponseMsg.success();
    }


}
