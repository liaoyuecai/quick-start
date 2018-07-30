import React from "react"
import {connect} from "react-redux"
import {Link, Redirect} from "react-router-dom"
import {Icon, Layout, Menu} from "antd"
import Top from "./header"
import Contents from "./content"
import Footer from "./bottom"
import "./index.less"
import BaseComponent from "../../common/BaseComponent"


const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const {Sider} = Layout

class Container extends BaseComponent {

    state = {
        menu: [],
        theme: 'dark',
        currentPage: '',
        openKeys: [],
        collapsed: false,
        mode: 'inline'  // 水平垂直展现
    }

    constructor(props) {
        super(props)
        const user = window.sessionStorage.getItem('user')
        if (user){
            this.state.menu = JSON.parse(user).menu
            const path = props.location.pathname
            this.checkCurrent(path.substr(1, path.length - 1), this.state.menu)
        }
    }

    checkCurrent(path, menu) {
        const _this = this
        menu.map(function (item) {
            if (item.children && item.children.length) {
                if (_this.checkCurrent(path, item.children)) {
                    _this.state.openKeys.push(e.parentId)
                }
            } else {
                if (path === item.url) {
                    _this.state.openKeys.push(item.parentId)
                    _this.state.currentPage = item.key
                    return true
                }
            }
        })
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: this.state.collapsed ? 'inline' : 'vertical',
        })
    }
    clear = () => {
        this.setState({
            currentPage: '',
            special: []
        })
    }
    handleClick = (e) => {
        this.setState({
            currentPage: e.key
        })
    }

    handleOpen = (e) => {
        if (e) {
            this.setState({
                openKeys: e
            })
        } else {
            this.setState({
                openKeys: []
            })
        }
    }

    render() {
        const user = window.sessionStorage.getItem('user')
        if (!user) {
            return <Redirect from="/" to="/login"/>
        }
        return (
            <Layout className="containAll">
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    className="leftMenu"
                >
                    {this.state.theme === 'light' ?
                        <a href="https://github.com/MuYunyun/react-antd-demo" target='_blank' rel='noopener noreferrer'><Icon
                            type="github" className="github"/></a> :
                        <a href="https://github.com/MuYunyun/react-antd-demo" target='_blank' rel='noopener noreferrer'><Icon
                            type="github" className="github white"/></a>}
                    {<span className="author white">Demo</span>}
                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        onOpenChange={this.handleOpen}
                        openKeys={this.state.openKeys}
                        selectedKeys={[this.state.currentPage]}
                        className="menu"
                        mode={this.state.mode}
                    >
                        {
                            this.state.menu.map(function (item) {
                                const showChildren = (e) => {
                                    if (e.children.length > 0) {
                                        return <MenuItemGroup key={e.key} title={<span>{e.name}</span>}>
                                            {
                                                e.children.map(function (item) {
                                                    return showChildren(item)
                                                })
                                            }
                                        </MenuItemGroup>
                                    } else {
                                        return <Menu.Item key={e.key}>
                                            <Link to={`/${e.url}`}>
                                                <span className="nav-text">{e.name}</span>
                                            </Link>
                                        </Menu.Item>

                                    }
                                }
                                if (item.children && item.children.length) {
                                    return (<SubMenu key={item.key} title={<span><Icon
                                        type={item.icon}/><span>{item.name}</span></span>}>
                                        {
                                            item.children.map(function (item) {
                                                return showChildren(item)
                                            })
                                        }
                                    </SubMenu>)
                                } else {
                                    return <Menu.Item key={item.key}>
                                        <Link to={`/${item.url}`}>
                                            <Icon type={item.icon}/><span className="nav-text">{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                }
                                // return <Menu.Item key={item.key}>
                                //             <Link to={`/${item.url}`}>
                                //                 <Icon type={item.icon}/><span className="nav-text">{item.name}</span>
                                //             </Link>
                                //         </Menu.Item>
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Top toggle={this.toggle} collapsed={this.state.collapsed} clear={this.clear}/>
                    <Contents/>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {}
    },
)(Container)