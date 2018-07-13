import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import routes from './common/routes'
import './index.less'
import DevTools from './devTools'
// import configureStore from './store/configureStore'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import store from './store'
const history = createHistory()


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        { routes }
        {/*{process.env.NODE_ENV === 'development' ? <DevTools /> : ''}*/}
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)