package org.quick.domain.bean;

public class SysUser {
    private String id;

    private String username;

    private String loginName;

    private String pwd;

    private String ctime;

    private Integer isDeleted;

    public SysUser(String id, String username, String loginName, String pwd, String ctime, Integer isDeleted) {
        this.id = id;
        this.username = username;
        this.loginName = loginName;
        this.pwd = pwd;
        this.ctime = ctime;
        this.isDeleted = isDeleted;
    }

    public SysUser() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName == null ? null : loginName.trim();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd == null ? null : pwd.trim();
    }

    public String getCtime() {
        return ctime;
    }

    public void setCtime(String ctime) {
        this.ctime = ctime == null ? null : ctime.trim();
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }
}