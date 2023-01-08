import * as forgotPasswordReducer from './reducers/forgotPassword'
import * as loginReducer from './reducers/login'
import * as logoutReducer from './reducers/logout'
import * as myProfileReducer from './reducers/myProfile'
import * as onBoardingReducer from './reducers/onBoarding'
import * as ownFeedReducer from './reducers/ownFeed'
import * as FeedReducer from './reducers/feed'
import * as registrationReducer from './reducers/registration'
import * as resetPasswordReducer from './reducers/resetPassword'
import * as suggestionsReducer from './reducers/suggestions'
import * as userProfileReducer from './reducers/userProfile'
import * as usersReducer from './reducers/users'
import * as followingUsersReducer from './reducers/followingUsers'

const sagaActions = {
    FORGOTPASSWORD_DATA_FETCH: `${forgotPasswordReducer.fetchForgotPasswordData.type}`,
    LOGIN_DATA_FETCH: `${loginReducer.fetchLoginData.type}`,
    LOGOUT_DATA_FETCH: `${logoutReducer.fetchLogoutData.type}`,
    MYPROFILE_DATA_FETCH: `${myProfileReducer.fetchMyProfileData.type}`,
    ONBOARDING_DATA_FETCH: `${onBoardingReducer.fetchOnBoardingData.type}`,
    OWNFeed_DATA_FETCH: `${ownFeedReducer.fetchOwnFeedData.type}`,
    Feed_DATA_FETCH: `${FeedReducer.fetchFeedData.type}`,
    REGISTRATION_DATA_FETCH: `${registrationReducer.fetchRegistrationData.type}`,
    RESETPASSWORD_DATA_FETCH: `${resetPasswordReducer.fetchResetPasswordData.type}`,
    SUGGESTIONS_DATA_FETCH: `${suggestionsReducer.fetchSuggestionsData.type}`,
    USERPROFILE_DATA_FETCH: `${userProfileReducer.fetchUserProfileData.type}`,
    USERS_DATA_FETCH: `${usersReducer.fetchUsersData.type}`,
    FOLLOWING_USERS_DATA_FETCH: `${followingUsersReducer.fetchFollowingUsers.type}`,
}

export default sagaActions
