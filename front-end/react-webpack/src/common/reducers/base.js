import {Map} from "immutable"
import {call, put, takeEvery} from "redux-saga/effects"
import fetch from "../utils/fetch"
import {error} from "../utils/dialog"
import pro from "../../properties"
const defaultState = Map()

const baseReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'PROVINCES_DATA':
            return state.set('provinces', action.data)
        case 'CITIES_DATA':
            return state.set('cities', action.data)
        case 'DISTRICTS_DATA':
            return state.set('districts', action.data)
        case 'NATIVE_PLACE_DATA':
            return state.set('nativePlace', action.data)
        default:
            return state
    }
}

function* nativePlaceGetting(action) {
    var data
    var actionType
    switch (action.no) {
        case 0:
            data = yield call(fetch, pro.application + '/getProvinces', action.value, 'POST')
            actionType = 'PROVINCES_DATA'
            break
        case 1:
            data = yield call(fetch, pro.application + '/getCities', action.value, 'POST')
            actionType = 'CITIES_DATA'
            break
        case 2:
            data = yield call(fetch, pro.application + '/getDistricts', action.value, 'POST')
            actionType = 'DISTRICTS_DATA'
            break
        default:
            data = yield call(fetch, pro.application + '/getNativePlace', action.value, 'POST')
            actionType = 'NATIVE_PLACE_DATA'
            break
    }

    if (data) {
        if (data.status) {
            yield put({type: actionType, data: data.message})
        } else {
            error(data.message)
        }
    }
}

function* baseSaga() {
    yield takeEvery("NATIVE_PLACE_GETTING", nativePlaceGetting)
}


export default {
    baseReducers,
    baseSaga
}