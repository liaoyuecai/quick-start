import {Map} from "immutable"
import {call, put, takeEvery} from "redux-saga/effects"
import {IdToKey} from "../utils/format"
import fetch from "../utils/fetch"
import {error} from "../utils/dialog"
import pro from "../../properties"
const defaultState = Map()

const tableReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'STUDENT_DATA':
            return state.set('student', action.data)
        default:
            return state
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
    yield takeEvery("SELECT_STUDENT", studentPage)
}


export default {
    tableReducers,
    tableSaga
}