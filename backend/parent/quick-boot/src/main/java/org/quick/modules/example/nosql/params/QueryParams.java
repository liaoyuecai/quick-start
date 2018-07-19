package org.quick.modules.example.nosql.params;

import lombok.Data;

@Data
public class QueryParams {
    Integer pageNo;
    Integer pageSize;
    /**
     * 排序字段
     */
    String field;
    /**
     * 排序方式 descend/ascend
     */
    String order;
    String filters;
}
