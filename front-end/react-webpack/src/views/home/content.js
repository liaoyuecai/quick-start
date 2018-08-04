import React from 'react'
import {Route} from 'react-router-dom'
import {Layout} from 'antd'
import './content.less'

import community from '../pages/community'
import student from '../pages/student'
import socket from '../pages/socket'

const {Content} = Layout

export default class Contents extends React.Component {


    constructor(props) {
        super(props)
        const permissions = JSON.parse(window.sessionStorage.getItem('user')).permissions
        const routes = []
        this.checkRoute(routes,permissions,'community',community)
        this.checkRoute(routes,permissions,'table',student)
        this.checkRoute(routes,permissions,'socket',socket)
        this.state = {
            routes:routes
        }
    }

    checkRoute(routes,permissions,url,route){
        if (permissions.includes(url)) {
            routes.push(<Route key={url} path={`/${url}`} component={route}/>)
        }
    }

    render() {
        return (
            <Content className="content" id="content">
                {
                    this.state.routes.map(function (item) {
                        return item
                    })
                }
            </Content>
        )
    }
}