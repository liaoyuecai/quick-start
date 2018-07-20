package org.quick.modules.example.nosql;


import org.bson.Document;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MongoQuery {
    Integer pageNo;
    Integer pageSize;
    List<QueryItem> queryItems = new ArrayList();

    String field;
    /**
     * 排序方式 descend/ascend
     */
    String order;

    /**
     * 筛选字段
     */
    String pros;

    public MongoQuery(Integer pageNo, Integer pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }

    public void addQueryItem(QueryItem item){
        queryItems.add(item);
    }

    public void setSort(String field,String order){
        this.field = field;
        this.order = order;
    }

    public MongoQuery() {
    }

    public void setPros(String pros) {
        this.pros = pros;
    }

    public Document getQueryDocument() {
        Document query = new Document();
        if (queryItems != null) {
            for (QueryItem item : queryItems) {
                item.init(query);
            }
        }
        return query;
    }

    public boolean hasPage() {
        return pageNo != null && pageSize != null;
    }


    public Integer getPageNo() {
        return pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public boolean isSort() {
        return field != null && order != null;
    }

    public boolean isPro() {
        return pros != null;
    }

    public Document sort() {
        switch (order) {
            case "descend":
                return new Document(field, -1);
            case "ascend":
                return new Document(field, 1);
        }
        return null;
    }

    public Document pro() {
        Document pro = new Document();
        Arrays.asList(pros.split(",")).forEach(filter -> {
            if (!StringUtils.isEmpty(filter))
                pro.put(filter, 1);
        });
        return pro;
    }

    public void clearQueryItems(){
        queryItems = new ArrayList();
    }

}
