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

    constructor(props) {
        super(props)
        const logined = window.sessionStorage.getItem('access_token')
        if (logined)
            this.props.getMenu()
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.openMenu && !this.props.currentPage) {
            this.setState({
                currentPage: nextProps.currentPage,
                openKeys: [nextProps.openMenu],
            })
        }
    }


    state = {
        theme: 'dark',
        currentPage: '',
        openKeys: [],
        collapsed: false,
        mode: 'inline'  // 水平垂直展现
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
        const logined = window.sessionStorage.getItem('access_token')
        if (!logined) {
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
                            this.props.menu.map(function (item) {
                                const showChildren = (e) => {
                                    if (e.children.length > 0) {
                                        return <MenuItemGroup key={e.id} title={<span>{e.name}</span>}>
                                            {
                                                e.children.map(function (item) {
                                                    return showChildren(item)
                                                })
                                            }
                                        </MenuItemGroup>
                                    } else {
                                        return <Menu.Item key={e.id}>
                                            <Link to={`/${e.url}`}>
                                                <span className="nav-text">{e.name}</span>
                                            </Link>
                                        </Menu.Item>

                                    }
                                }
                                if (item.children && item.children.length) {
                                    return (<SubMenu key={item.id} title={<span><Icon
                                        type={item.icon}/><span>{item.name}</span></span>}>
                                        {
                                            item.children.map(function (item) {
                                                return showChildren(item)
                                            })
                                        }
                                    </SubMenu>)
                                } else {
                                    return <Menu.Item key={e.id}>
                                        <Link to={`/${item.url}`}>
                                            <Icon type={item.icon}/><span className="nav-text">{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                }
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
        const menu = state.getIn(['homeReducers', 'menu'])
        if (menu) {
            var currentPage = '0'
            var openMenu = '0'
            menu.map(function (item) {
                const checkIndex = (e) => {
                    if (e.children && e.children.length) {
                        var re = e.children.map(function (item) {
                            if (checkIndex(item))
                                return true
                        })
                        return re.includes(true)
                    } else {
                        if (location.pathname === `/${e.url}`) {
                            currentPage = e.id
                            return true
                        }
                    }
                }

                if (item.children && item.children.length) {
                    item.children.map(function (e) {
                        if (checkIndex(e))
                            openMenu = e.pid
                    })
                } else {
                    if (location.pathname === `/${item.url}`) {
                        currentPage = item.id
                    }
                }
            })
            return {
                currentPage: currentPage,
                openMenu: openMenu,
                menu: menu
            }
        } else {
            return {
                menu: []
            }
        }
    },
    (dispatch) => {
        return {
            getMenu: () => {
                dispatch({type: 'INDEX_MENU'})
            }
        }
    },
)(Container)