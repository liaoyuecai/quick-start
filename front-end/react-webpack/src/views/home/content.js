import React from 'react'
import {Route} from 'react-router-dom'
import {Layout} from 'antd'
import './content.less'

import community from '../pages/community'
import table from '../pages/table/test'
import tools from '../pages/tools'

const {Content} = Layout

export default class Contents extends React.Component {


    constructor(props) {
        super(props)
        const permissions = JSON.parse(window.sessionStorage.getItem('user')).permissions
        const routes = []
        this.checkRoute(routes,permissions,'community',community)
        this.checkRoute(routes,permissions,'table',table)
        this.checkRoute(routes,permissions,'tools',tools)
        // if (permissions.includes('community')) {
        //     const route = <Route key={'community'} path="/community" component={community}/>
        //     routes.push(route)
        // }
        // if (permissions.includes('table')) {
        //     const route = <Route key={'table'} path="/table" component={table}/>
        //     routes.push(route)
        // }if (permissions.includes('tools')) {
        //     const route = <Route key={'tools'} path="/tools" component={tools}/>
        //     routes.push(route)
        // }
        this.state = {
            routes:routes
        }
    }

    checkRoute(routes,permissions,url,route){
        if (permissions.includes(url)) {
            routes.push(<Route key={url} path={`/${url}`} component={route}/>)
        }

        console.log(routes)
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