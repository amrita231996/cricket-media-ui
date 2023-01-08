import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'

import * as forgotPassword from './forgotPassword'
import * as login from './login'
import * as logout from './logout'
import * as myProfile from './myProfile'
import * as onBoarding from './onBoarding'
import * as ownFeed from './ownFeed'
import * as Feed from './feed'
import * as registration from './registration'
import * as resetPassword from './resetPassword'
import * as suggestions from './suggestions'
import * as userProfile from './userProfile'
import * as users from './users'
import * as followingUsers from './followingUsers'

export default function* rootSaga() {
  yield all([
    takeLatest(sagaActions.FORGOTPASSWORD_DATA_FETCH, forgotPassword.loginApiSaga),
    takeLatest(sagaActions.LOGIN_DATA_FETCH, login.loginApiSaga),
    takeLatest(sagaActions.LOGOUT_DATA_FETCH, logout.loginApiSaga),
    takeLatest(sagaActions.MYPROFILE_DATA_FETCH, myProfile.loginApiSaga),
    takeLatest(sagaActions.ONBOARDING_DATA_FETCH, onBoarding.loginApiSaga),
    takeLatest(sagaActions.OWNFeed_DATA_FETCH, ownFeed.loginApiSaga),
    takeLatest(sagaActions.Feed_DATA_FETCH, Feed.loginApiSaga),
    takeLatest(sagaActions.REGISTRATION_DATA_FETCH, registration.loginApiSaga),
    takeLatest(sagaActions.RESETPASSWORD_DATA_FETCH, resetPassword.loginApiSaga),
    takeLatest(sagaActions.FOLLOWING_USERS_DATA_FETCH, followingUsers.followingUsersSaga),
    takeLatest(sagaActions.SUGGESTIONS_DATA_FETCH, suggestions.loginApiSaga),
    takeLatest(sagaActions.USERPROFILE_DATA_FETCH, userProfile.loginApiSaga),
    takeLatest(sagaActions.USERS_DATA_FETCH, users.loginApiSaga),
  ])
}
