package org.quick.modules.auth.bean;

public class SysRole {
    private String id;

    private String roleName;

    private String roleTag;

    public SysRole(String id, String roleName, String roleTag) {
        this.id = id;
        this.roleName = roleName;
        this.roleTag = roleTag;
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

    public String getRoleTag() {
        return roleTag;
    }

    public void setRoleTag(String roleTag) {
        this.roleTag = roleTag == null ? null : roleTag.trim();
    }
}