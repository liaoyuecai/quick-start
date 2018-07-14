package org.quick.modules.auth.bean;

import java.util.Date;

public class SysUser {
    private String id;

    private String username;

    private String loginName;

    private String pwd;

    private Date ctime;

    public SysUser(String id, String username, String loginName, String pwd, Date ctime) {
        this.id = id;
        this.username = username;
        this.loginName = loginName;
        this.pwd = pwd;
        this.ctime = ctime;
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

    public Date getCtime() {
        return ctime;
    }

    public void setCtime(Date ctime) {
        this.ctime = ctime;
    }
}