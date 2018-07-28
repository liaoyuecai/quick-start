package org.quick.application.modules.auth.view;

import lombok.Data;
import org.quick.application.modules.auth.bean.SysPermission;

import java.util.ArrayList;
import java.util.List;

/**
 * 菜单
 */
@Data
public class MenuView {
    private String key;

    private String name;

    private String url;

    private String parentId;

    private String icon;

    List<MenuView> children = new ArrayList<>();

    public MenuView() {
    }

    public MenuView(SysPermission permission) {
        this.key = permission.getId();
        this.name = permission.getName();
        this.url = permission.getUrl();
        this.parentId = permission.getParentId();
        this.icon = permission.getIcon();
    }

    public void addChild(MenuView view) {
        children.add(view);
    }
}
