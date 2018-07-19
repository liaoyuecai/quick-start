package org.quick.modules.example.service.impl;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.quick.modules.example.nosql.MongoQuery;
import org.quick.modules.example.nosql.NoSqlPage;
import org.quick.modules.example.service.MongoService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MongoServiceImpl implements MongoService {

    protected final Map<String, MongoCollection<Document>> collectionMap = new ConcurrentHashMap();

    @Autowired
    MongoClient mongoClient;

    protected MongoCollection<Document> getCollection(String database, String collection) {
        String key = database + "." + collection;
        if (collectionMap.containsKey(key)) {
            return collectionMap.get(key);
        } else {
            MongoDatabase db = mongoClient.getDatabase(database);
            MongoCollection<Document> col = db.getCollection(collection);
            collectionMap.put(key, col);
            return col;
        }
    }

    @Override
    public NoSqlPage<Map> find(String database, String collection, MongoQuery query) {
        MongoCollection<Document> col = getCollection(database, collection);
        Document document = query.getQueryDocument();
        FindIterable<Document> findIterable = col.find(document);
        if (query.isPro())
            findIterable = findIterable.projection(query.pro());
        if (query.isSort())
            findIterable = findIterable.sort(query.sort());
        long totalPage = col.countDocuments(document);
        if (query.hasPage()) {
            findIterable.skip((query.getPageNo() - 1) * query.getPageSize());
            findIterable.limit(query.getPageSize());
        }
        List<Map> list = list(findIterable.iterator());
        NoSqlPage<Map> page = new NoSqlPage(totalPage, query.getPageSize(), list);
        return page;
    }

    @Override
    public List<Map> findList(String database, String collection, MongoQuery query) {
        MongoCollection<Document> col = getCollection(database, collection);
        Document document = query.getQueryDocument();
        FindIterable<Document> findIterable = col.find(document);
        if (query.isPro())
            findIterable = findIterable.projection(query.pro());
        if (query.isSort())
            findIterable = findIterable.sort(query.sort());
        if (query.hasPage()) {
            findIterable.skip((query.getPageNo() - 1) * query.getPageSize());
            findIterable.limit(query.getPageSize());
        }
        return list(findIterable.iterator());
    }

    @Override
    public <T> void upsertOne(String database, String collection, T t) {
        MongoCollection<Document> col = getCollection(database, collection);
        JSONObject item = JSON.parseObject(JSON.toJSONString(t));
        Document query = new Document("_id", new ObjectId(item.get("id").toString()));
        Document update = new Document();
        UpdateOptions u = new UpdateOptions();
        u.upsert(true);
        item.keySet().forEach(key -> {
            update.put(key, item.get(key));
        });
        col.updateOne(query, new Document("$set", update), u);
    }

    @Override
    public Map findById(String database, String collection, String id) {
        MongoCollection<Document> col = getCollection(database, collection);
        List<Map> list = list(col.find(new Document("_id", new ObjectId(id))).iterator());
        return list.get(0);
    }

    List<Map> list(MongoCursor<Document> cursor) {
        List<Map> list = new ArrayList();
        Document d;
        try {
            while (cursor.hasNext()) {
                d = cursor.next();
                d.put("id", d.get("_id").toString());
                list.add(d);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            cursor.close();
        }
        return list;
    }
}
