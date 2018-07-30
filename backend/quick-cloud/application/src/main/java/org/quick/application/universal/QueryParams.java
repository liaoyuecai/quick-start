package org.quick.application.universal;

import lombok.Data;

@Data
public class QueryParams {
    Integer pageNo;
    Integer pageSize;
    String field;
    String order;
}
