package org.quick.application.modules.sample.controller;

import org.quick.application.modules.sample.bean.Student;
import org.quick.application.modules.sample.bean.StudentQueryParams;
import org.quick.application.modules.sample.service.StudentService;
import org.quick.application.universal.RequestBodyJson;
import org.quick.application.universal.ResponseMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sample/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @RequestMapping(value = "/studentPage", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg studentPage(@RequestBody StudentQueryParams params) {
        return ResponseMsg.success(studentService.findStudent(params));
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg delete(@RequestBody RequestBodyJson json) {
        return ResponseMsg.success(studentService.deleteByIds(json.getIds()));
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg insert(@RequestBody Student student) {
        return ResponseMsg.success(studentService.insert(student));
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMsg update(@RequestBody Student student) {
        return ResponseMsg.success(studentService.update(student));
    }
}
