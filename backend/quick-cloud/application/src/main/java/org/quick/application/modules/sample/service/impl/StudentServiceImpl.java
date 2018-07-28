package org.quick.application.modules.sample.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.quick.application.modules.sample.bean.Student;
import org.quick.application.modules.sample.bean.StudentExample;
import org.quick.application.modules.sample.dao.StudentMapper;
import org.quick.application.modules.sample.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(value = "txManager")
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentMapper studentMapper;

    @Override
    public PageInfo<Student> findStudent() {
        PageHelper.startPage(0, 10);
        List<Student> list = studentMapper.selectByExample(new StudentExample());
        PageInfo<Student> page = new PageInfo(list);
        return page;
    }
}
