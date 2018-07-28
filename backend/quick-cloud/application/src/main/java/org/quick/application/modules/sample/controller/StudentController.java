package org.quick.application.modules.sample.controller;

import org.quick.application.modules.sample.service.StudentService;
import org.quick.application.universal.ResponseMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/sample/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @RequestMapping(value = "/studentPage", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg studentPage(HttpServletRequest request) {
        return ResponseMsg.success(studentService.findStudent());
    }
}
