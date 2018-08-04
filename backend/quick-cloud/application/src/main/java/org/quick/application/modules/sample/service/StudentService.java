package org.quick.application.modules.sample.service;

import com.github.pagehelper.PageInfo;
import org.quick.application.modules.sample.bean.Student;
import org.quick.application.modules.sample.bean.StudentQueryParams;

import java.util.List;

public interface StudentService {
    PageInfo<Student> findStudent(StudentQueryParams params);

    List<String> deleteByIds(String ids);

    String insert(Student student);

    int update(Student student);

}
