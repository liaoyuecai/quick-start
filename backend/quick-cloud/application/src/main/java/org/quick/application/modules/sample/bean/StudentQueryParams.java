package org.quick.application.modules.sample.bean;

import lombok.Data;
import org.quick.application.universal.QueryParams;
@Data
public class StudentQueryParams extends QueryParams{

    private String name;

    private Short age;

    private Short sex;

    private String phone;
}
