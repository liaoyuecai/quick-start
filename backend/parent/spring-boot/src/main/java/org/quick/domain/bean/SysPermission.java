package org.quick.domain.bean;

public class SysPermission {
    private String id;

    private String permissionName;

    private String url;

    private String parentId;

    private String permissionType;

    public SysPermission(String id, String permissionName, String url, String parentId, String permissionType) {
        this.id = id;
        this.permissionName = permissionName;
        this.url = url;
        this.parentId = parentId;
        this.permissionType = permissionType;
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

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName == null ? null : permissionName.trim();
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

    public String getPermissionType() {
        return permissionType;
    }

    public void setPermissionType(String permissionType) {
        this.permissionType = permissionType == null ? null : permissionType.trim();
    }
}