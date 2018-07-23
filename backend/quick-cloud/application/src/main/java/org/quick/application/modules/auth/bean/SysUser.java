package org.quick.application.modules.auth.bean;

import java.util.Date;

public class SysUser {
    private String id;

    private String userName;

    private String loginName;

    private String password;

    private Date createTime;

    public SysUser(String id, String userName, String loginName, String password, Date createTime) {
        this.id = id;
        this.userName = userName;
        this.loginName = loginName;
        this.password = password;
        this.createTime = createTime;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void e(Date createTime) {
        this.createTime = createTime;
    }
}