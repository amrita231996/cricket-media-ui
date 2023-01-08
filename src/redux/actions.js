import * as dealsReducer from './reducers/deals'
import * as forgotPasswordReducer from './reducers/forgotPassword'
import * as inviteReducer from './reducers/invite'
import * as loginReducer from './reducers/login'
import * as logoutReducer from './reducers/logout'
import * as myProfileReducer from './reducers/myProfile'
import * as notificationReducer from './reducers/notification'
import * as onBoardingReducer from './reducers/onBoarding'
import * as ownPitchReducer from './reducers/ownPitch'
import * as pitchReducer from './reducers/pitch'
import * as registrationReducer from './reducers/registration'
import * as resetPasswordReducer from './reducers/resetPassword'
import * as searchByPostReducer from './reducers/searchByPost'
import * as searchByProfileReducer from './reducers/searchByProfile'
import * as suggestionsReducer from './reducers/suggestions'
import * as userProfileReducer from './reducers/userProfile'
import * as usersReducer from './reducers/users'
import * as followingUsersReducer from './reducers/followingUsers'

const sagaActions = {
    DEALS_DATA_FETCH: `${dealsReducer.fetchDealsData.type}`,
    FORGOTPASSWORD_DATA_FETCH: `${forgotPasswordReducer.fetchForgotPasswordData.type}`,
    INVITE_DATA_FETCH: `${inviteReducer.fetchInviteData.type}`,
    LOGIN_DATA_FETCH: `${loginReducer.fetchLoginData.type}`,
    LOGOUT_DATA_FETCH: `${logoutReducer.fetchLogoutData.type}`,
    MYPROFILE_DATA_FETCH: `${myProfileReducer.fetchMyProfileData.type}`,
    NOTIFICATION_DATA_FETCH: `${notificationReducer.fetchNotificationData.type}`,
    ONBOARDING_DATA_FETCH: `${onBoardingReducer.fetchOnBoardingData.type}`,
    OWNPITCH_DATA_FETCH: `${ownPitchReducer.fetchOwnPitchData.type}`,
    PITCH_DATA_FETCH: `${pitchReducer.fetchPitchData.type}`,
    REGISTRATION_DATA_FETCH: `${registrationReducer.fetchRegistrationData.type}`,
    RESETPASSWORD_DATA_FETCH: `${resetPasswordReducer.fetchResetPasswordData.type}`,
    SEARCHBYPOST_DATA_FETCH: `${searchByPostReducer.fetchSearchByPostData.type}`,
    SEARCHBYPROFILE_DATA_FETCH: `${searchByProfileReducer.fetchSearchByProfileData.type}`,
    SUGGESTIONS_DATA_FETCH: `${suggestionsReducer.fetchSuggestionsData.type}`,
    USERPROFILE_DATA_FETCH: `${userProfileReducer.fetchUserProfileData.type}`,
    USERS_DATA_FETCH: `${usersReducer.fetchUsersData.type}`,
    FOLLOWING_USERS_DATA_FETCH: `${followingUsersReducer.fetchFollowingUsers.type}`,
}

export default sagaActions
