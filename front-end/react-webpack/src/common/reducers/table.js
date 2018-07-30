import {Map} from "immutable"
import {call, put, takeEvery} from "redux-saga/effects"
import {IdToKey} from "../utils/format"
import fetch from "../utils/fetch"
import {error} from "../utils/dialog"
import pro from "../../properties"
const defaultState = Map()

const tableReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'COMMUNITY_LIST':
            return state.set('community_table_data', action.data)
        case 'COMMUNITY_DATA':
            return state.set('community_data', action.data)
        case 'STUDENT_DATA':
            return state.set('studentsPage', action.data)
        default:
            return state
    }
}

function* communityTable(action) {
    const data = yield call(fetch, pro.application + '/community/list', action.value, 'POST')
    if (data) {
        if (data.code== 0) {
            data.message.rows = IdToKey(data.message.rows)
            yield put({type: 'COMMUNITY_LIST', data: data.message})
        } else {
            error(data.message)
        }
    }
}
function* communityEdit(action) {
    const data = yield call(fetch, pro.application + '/community/edit', action.value, 'POST')
    if (data) {
        if (data.code== 0) {
            const data = yield call(fetch, pro.application + '/community/list', action.params, 'POST')
            if (data) {
                if (data.status) {
                    data.message.rows = IdToKey(data.message.rows)
                    yield put({type: 'COMMUNITY_LIST', data: data.message})
                } else {
                    error(data.message)
                }
            }
        } else {
            error(data.message)
        }
    }
}

function* communityGetting(action) {
    const data = yield call(fetch, pro.application + '/community/findByKey', {id: action.value}, 'POST')
    if (data) {
        if (data.code== 0) {
            yield put({type: 'COMMUNITY_DATA', data: data.message})
        } else {
            error(data.message)
        }
    }
}
function* studentPage(action) {
    const data = yield call(fetch, action.url, action.value, 'POST')
    if (data) {
        if (data.code== 0) {
            const page = data.message
            IdToKey(page.list)
            yield put({type: 'STUDENT_DATA', data: page})
        } else {
            error(data.message)
        }
    }
}

function* tableSaga() {
    yield takeEvery("COMMUNITY_TABLE", communityTable)
    yield takeEvery("COMMUNITY_EDIT", communityEdit)
    yield takeEvery("COMMUNITY_GETTING", communityGetting)
    yield takeEvery("SELECT_STUDENT", studentPage)
}


export default {
    tableReducers,
    tableSaga
}