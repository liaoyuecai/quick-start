package org.quick.modules.auth.bean;

public class SysRole {
    private String id;

    private String name;

    private String tag;

    public SysRole(String id, String name, String tag) {
        this.id = id;
        this.name = name;
        this.tag = tag;
    }

    public SysRole() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag == null ? null : tag.trim();
    }
}