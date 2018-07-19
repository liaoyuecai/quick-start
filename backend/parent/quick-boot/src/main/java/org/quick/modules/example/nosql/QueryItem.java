package org.quick.modules.example.nosql;


import org.bson.Document;

import java.util.regex.Pattern;

public class QueryItem {
    public enum Type {
        IS, LIKE, IN, ONT_IN, NE
    }

    Type type;
    String fieldName;
    Object condition;

    public QueryItem(Type type, String fieldName, Object condition) {
        this.type = type;
        this.fieldName = fieldName;
        this.condition = condition;
    }

    public void init(Document query) {
        switch (type) {
            case IN:
                query.put(fieldName, new Document("$in", condition));
                break;
            case IS:
                query.put(fieldName, condition);
                break;
            case NE:
                query.put(fieldName, new Document("$ne", condition));
                break;
            case LIKE:
                query.put(fieldName, Pattern.compile("^.*" + condition + ".*$"));
                break;
        }
    }
}
