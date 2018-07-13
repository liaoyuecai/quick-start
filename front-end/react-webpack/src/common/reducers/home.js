import {Map} from "immutable"
import {call, put, takeEvery} from "redux-saga/effects"
import fetch from "../utils/fetch"
import {error} from "../utils/dialog"
import pro from "../../properties"
const defaultState = Map()

const homeReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'INDEX_MENU_ACTION':
            return state.set('menu', action.sss)
        default:
            return state
    }
}

function* menu(action) {
    // const data = yield fetch()
    const data = yield call(fetch, pro.application + '/getMenu', {}, 'POST')
    if (data) {
        if (data.status) {
            yield put({type: 'INDEX_MENU_ACTION', sss: data.message})
        } else {
            error(data.message)
            yield put({type: 'INDEX_MENU_ACTION', sss: []})
        }
    } else {
        yield put({type: 'INDEX_MENU_ACTION', sss: []})
    }
}

function* indexSaga() {
    yield takeEvery("INDEX_MENU", menu)
}


export default {
    homeReducers,
    indexSaga
}