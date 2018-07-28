import {Map} from "immutable"
import {call, put, takeEvery} from "redux-saga/effects"
import fetch from "../utils/fetch"
import {error} from "../utils/dialog"
const LOGIN_ACTION = {type: 'LOGIN_ACTION'}


const defaultState = Map({logined: false})

const loginReducers = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_ACTION.type:
            return state.set('logined', action.logined)
        default:
            return state
    }
}


function* loginRequest(action) {
    const data = yield call(fetch, action.url, action.value, 'POST')
    if (data) {
        if (data.code==0) {
            window.sessionStorage.setItem('user', JSON.stringify(data.message))
            window.sessionStorage.setItem('userName', data.message.user.userName)
            yield put({type: 'LOGIN_ACTION', logined: true})
        } else {
            window.sessionStorage.clear()
            error(data.message)
            yield put({type: 'LOGIN_ACTION', logined: false})
        }
    } else {
        yield put({type: 'LOGIN_ACTION', logined: false})
    }
}

function* loginSaga() {
    // 开始登录
    yield takeEvery("LOGIN_REQUEST", loginRequest)
}

export default {
    loginReducers,
    loginSaga
}

