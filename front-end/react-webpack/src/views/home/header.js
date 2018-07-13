import React from 'react'
import {Menu, Icon, Layout, Tag} from 'antd'
import {Link} from 'react-router-dom'
import * as screenfull from 'screenfull'
import BaseComponent from '../../common/BaseComponent'
import './header.less'

const SubMenu = Menu.SubMenu
const {Header} = Layout

export default class Top extends BaseComponent {
    state = {
        username: window.sessionStorage.getItem('userName')
    }
    clear = (item) => {
        if (item.key === 'logOut') {
            window.sessionStorage.clear()
            this.props.clear()
        }
    }

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request()
        }
    }

    render() {
        return (
            <Header style={{background: '#fff'}}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Tag color="magenta">Header Tag</Tag>
                <Menu mode="horizontal" className="logOut" onClick={this.clear}>
                    <SubMenu title={<span><Icon type="user"/>{ this.state.username }</span>}>
                        <Menu.Item key="logOut"><Link to="/login">退出</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <Icon
                    className="screenFull"
                    type="arrows-alt"
                    onClick={this.screenFull}
                />
            </Header>
        )
    }
}