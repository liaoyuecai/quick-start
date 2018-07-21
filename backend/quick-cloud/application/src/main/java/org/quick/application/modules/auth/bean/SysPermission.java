package org.quick.application.modules.auth.bean;

public class SysPermission {
    private String id;

    private String name;

    private String url;

    private String parentId;

    public SysPermission(String id, String name, String url, String parentId) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.parentId = parentId;
    }

    public SysPermission() {
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId == null ? null : parentId.trim();
    }
}