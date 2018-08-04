package org.quick.application.modules.sample.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.quick.application.modules.sample.bean.Student;
import org.quick.application.modules.sample.bean.StudentExample;
import org.quick.application.modules.sample.bean.StudentQueryParams;

public interface StudentMapper {
    long countByExample(StudentExample example);

    int deleteByExample(StudentExample example);

    int deleteByPrimaryKey(String id);

    int deleteByPrimaryKeys(@Param("ids") List<String> ids);

    int insert(Student record);

    int insertSelective(Student record);

    List<Student> selectByExample(StudentExample example);

    List<Student> selectByPage(StudentQueryParams params);

    Student selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Student record, @Param("example") StudentExample example);

    int updateByExample(@Param("record") Student record, @Param("example") StudentExample example);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);
}