package org.quick.modules.auth.controller;

import org.quick.universal.ResponseMsg;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/auth")
public class LoginController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "/login";
    }


    @RequestMapping("/success")
    @ResponseBody
    public ResponseMsg index() {
        return ResponseMsg.success();
    }

    @RequestMapping("/fail")
    @ResponseBody
    public ResponseMsg fail() {
        return ResponseMsg.error("用户名或密码错误");
    }

}
