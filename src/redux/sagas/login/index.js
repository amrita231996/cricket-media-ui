import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { saveUser } from '../../../utils/businessLogic'

import { setLoginData, setLoginError } from '../../reducers/login'

export const loginAPI = (data) => {
    var loginOptions = {
        method: "post",
        url: global.config.ROOTURL.prod + "/auth/login/",

        data: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        json: true,
    }
    return axios(loginOptions)
}

export function* loginApiSaga(action) {
    const { data } = action.payload
    try {
        const response = yield call(loginAPI, data)
        saveUser(response?.data)
        yield put(setLoginData(response?.data))
    } catch (error) {
        yield put(setLoginError(error))
    }
}
