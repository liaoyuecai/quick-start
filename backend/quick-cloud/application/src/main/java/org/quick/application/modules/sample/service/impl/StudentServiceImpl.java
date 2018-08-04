package org.quick.application.modules.sample.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.quick.application.exception.DataException;
import org.quick.application.modules.sample.bean.Student;
import org.quick.application.modules.sample.bean.StudentQueryParams;
import org.quick.application.modules.sample.dao.StudentMapper;
import org.quick.application.modules.sample.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@Transactional(value = "txManager")
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentMapper studentMapper;

    @Override
    public PageInfo<Student> findStudent(StudentQueryParams params) {
        PageHelper.offsetPage((params.getPageNo() - 1) * params.getPageSize(), params.getPageSize());
        List<Student> list = studentMapper.selectByPage(params);
        PageInfo<Student> page = new PageInfo(list);
        return page;
    }

    @Override
    public List<String> deleteByIds(String ids) {
        if (StringUtils.isNotEmpty(ids)) {
            List<String> list = Arrays.asList(ids.split(","));
            int i = studentMapper.deleteByPrimaryKeys(list);
            if (i != list.size())
                throw new RuntimeException("删除学生数据异常,请联系管理员");
            return list;
        }
        throw new RuntimeException(new DataException("参数异常,删除学生表id不能为空"));
    }

    @Override
    public String insert(Student student) {
        int i = studentMapper.insert(student);
        if (i != 1)
            throw new RuntimeException("新增学生数据异常,请联系管理员");
        return student.getId();
    }

    @Override
    public int update(Student student) {
        int i = studentMapper.updateByPrimaryKey(student);
        if (i != 1)
            throw new RuntimeException("修改学生数据异常,请联系管理员");
        return i;
    }
}
