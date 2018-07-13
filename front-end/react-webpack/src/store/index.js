import {applyMiddleware, compose, createStore} from "redux"
import {Map} from "immutable"
import createSagaMiddleware from "redux-saga"
import {combineReducers} from "redux-immutable"
import reducers from "../common/reducers"
import DevTools from "../devTools"
import thunk from "redux-thunk"
import logger from "../common/middleware/logger"
// 组装reducer
const allReducers = {}
for (const k in reducers) {
    const model = reducers[k]

    const reducerReg = /(.*)Reducers$/
    for (const m in model) {
        if (reducerReg.test(m)) {
            allReducers[m] = model[m]
        }
    }
}

const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(
    // applyMiddleware(thunk, middleware),
    applyMiddleware(sagaMiddleware, thunk, logger),
    DevTools.instrument(),
)

const initialState = Map()
const store = createStore(
    combineReducers(allReducers),
    initialState,
    enhancer
)
// 组装saga
for (const k in reducers) {
    const model = reducers[k]
    const sagaReg = /(.*)Saga$/
    for (const m in model) {
        if (sagaReg.test(m)) {
            sagaMiddleware.run(model[m])
        }
    }
}

export default store