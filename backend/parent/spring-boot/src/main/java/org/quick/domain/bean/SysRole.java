package org.quick.domain.bean;

public class SysRole {
    private String id;

    private String roleName;

    public SysRole(String id, String roleName) {
        this.id = id;
        this.roleName = roleName;
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

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }
}