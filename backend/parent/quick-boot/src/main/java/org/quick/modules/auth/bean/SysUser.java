package org.quick.modules.auth.bean;

import java.util.Date;

public class SysUser {
    private String id;

    private String userName;

    private String loginName;

    private String pwd;

    private Date creatTime;

    public SysUser(String id, String userName, String loginName, String pwd, Date creatTime) {
        this.id = id;
        this.userName = userName;
        this.loginName = loginName;
        this.pwd = pwd;
        this.creatTime = creatTime;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
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

    public Date getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(Date creatTime) {
        this.creatTime = creatTime;
    }
}