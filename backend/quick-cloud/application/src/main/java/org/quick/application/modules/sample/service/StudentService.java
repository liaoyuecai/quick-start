package org.quick.application.modules.sample.service;

import com.github.pagehelper.PageInfo;
import org.quick.application.modules.sample.bean.Student;

public interface StudentService {
    PageInfo<Student> findStudent();
}
