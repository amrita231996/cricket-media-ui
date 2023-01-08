import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { getStorageItem } from '../../../utils/sessionStorage'

import { setFollowingUsersData, setFollowingUsersError } from '../../reducers/followingUsers'

export const followingUsersGetAPI = () => {
    var apiOptions = {
        method: "GET",
        url: global.config.ROOTURL.prod + "/auth/get-following-user/",
        headers: {
            Authorization: "Bearer " + getStorageItem('token'),
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        json: true,
    }
    return axios(apiOptions)
}

export function* followingUsersSaga(action) {
    try {
        const response = yield call(followingUsersGetAPI)
        yield put(setFollowingUsersData([...response?.data]))
    } catch (error) {
        yield put(setFollowingUsersError(error))
    }
}
