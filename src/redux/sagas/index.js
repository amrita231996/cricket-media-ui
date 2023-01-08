import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'

import * as deals from './deals'
import * as forgotPassword from './forgotPassword'
import * as invite from './invite'
import * as login from './login'
import * as logout from './logout'
import * as myProfile from './myProfile'
import * as notification from './notification'
import * as onBoarding from './onBoarding'
import * as ownFeed from './ownFeed'
import * as Feed from './feed'
import * as registration from './registration'
import * as resetPassword from './resetPassword'
import * as searchByPost from './searchByPost'
import * as searchByProfile from './searchByProfile'
import * as suggestions from './suggestions'
import * as userProfile from './userProfile'
import * as users from './users'
import * as followingUsers from './followingUsers'

export default function* rootSaga() {
  yield all([
    takeLatest(sagaActions.DEALS_DATA_FETCH, deals.loginApiSaga),
    takeLatest(sagaActions.FORGOTPASSWORD_DATA_FETCH, forgotPassword.loginApiSaga),
    takeLatest(sagaActions.INVITE_DATA_FETCH, invite.loginApiSaga),
    takeLatest(sagaActions.LOGIN_DATA_FETCH, login.loginApiSaga),
    takeLatest(sagaActions.LOGOUT_DATA_FETCH, logout.loginApiSaga),
    takeLatest(sagaActions.MYPROFILE_DATA_FETCH, myProfile.loginApiSaga),
    takeLatest(sagaActions.NOTIFICATION_DATA_FETCH, notification.loginApiSaga),
    takeLatest(sagaActions.ONBOARDING_DATA_FETCH, onBoarding.loginApiSaga),
    takeLatest(sagaActions.OWNFeed_DATA_FETCH, ownFeed.loginApiSaga),
    takeLatest(sagaActions.Feed_DATA_FETCH, Feed.loginApiSaga),
    takeLatest(sagaActions.REGISTRATION_DATA_FETCH, registration.loginApiSaga),
    takeLatest(sagaActions.RESETPASSWORD_DATA_FETCH, resetPassword.loginApiSaga),
    takeLatest(sagaActions.SEARCHBYPOST_DATA_FETCH, searchByPost.loginApiSaga),
    takeLatest(sagaActions.FOLLOWING_USERS_DATA_FETCH, followingUsers.followingUsersSaga),
    takeLatest(sagaActions.SEARCHBYPROFILE_DATA_FETCH, searchByProfile.loginApiSaga),
    takeLatest(sagaActions.SUGGESTIONS_DATA_FETCH, suggestions.loginApiSaga),
    takeLatest(sagaActions.USERPROFILE_DATA_FETCH, userProfile.loginApiSaga),
    takeLatest(sagaActions.USERS_DATA_FETCH, users.loginApiSaga),
  ])
}
