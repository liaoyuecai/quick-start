import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import Container from '../views/home'
import Login from '../views/login'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const routes = (
    <Router history={history}>
        <Switch>
            <Route exec path="/login" component={Login}/>
            <Route exec path="/" component={Container}/>
        </Switch>
    </Router>
)

export default routes
