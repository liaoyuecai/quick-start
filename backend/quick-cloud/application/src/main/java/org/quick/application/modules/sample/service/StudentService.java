package org.quick.application.modules.sample.service;

import com.github.pagehelper.PageInfo;
import org.quick.application.modules.sample.bean.Student;
import org.quick.application.modules.sample.bean.StudentQueryParams;

public interface StudentService {
    PageInfo<Student> findStudent(StudentQueryParams params);
}
