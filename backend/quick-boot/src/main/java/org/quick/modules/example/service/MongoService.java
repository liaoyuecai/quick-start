package org.quick.modules.example.service;

import org.quick.modules.example.nosql.MongoQuery;
import org.quick.modules.example.nosql.NoSqlPage;

import java.util.List;
import java.util.Map;

public interface MongoService {
    NoSqlPage<Map> find(String database, String collection, MongoQuery query);

    List<Map> findList(String database, String collection, MongoQuery query);

    <T> void upsertOne(String database, String collection, T t);

    Map findById(String database, String collection, String id);
}
