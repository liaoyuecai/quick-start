package org.quick.modules.example.nosql;


import lombok.Data;

import java.util.List;

@Data
public class NoSqlPage<T> {
    Long totalPage;
    Integer pageSize;
    List<T> rows;

    public NoSqlPage(Long totalPage, Integer pageSize, List<T> rows) {
        this.totalPage = totalPage;
        this.pageSize = pageSize;
        this.rows = rows;
    }
}
