import { combineReducers } from 'redux'

import deals from './deals'
import forgotPassword from './forgotPassword'
import invite from './invite'
import login from './login'
import logout from './logout'
import myProfile from './myProfile'
import notification from './notification'
import onBoarding from './onBoarding'
import ownPitch from './ownPitch'
import pitch from './pitch'
import registration from './registration'
import resetPassword from './resetPassword'
import searchByPost from './searchByPost'
import searchByProfile from './searchByProfile'
import suggestions from './suggestions'
import userProfile from './userProfile'
import users from './users'
import followingUsers from './followingUsers'
import PathSlice from './globalPath'

const reducers = combineReducers({
  deals,
  path:PathSlice.reducer,
  forgotPassword,
  invite,
  login,
  logout,
  myProfile,
  notification,
  onBoarding,
  ownPitch,
  pitch,
  registration,
  resetPassword,
  searchByPost,
  searchByProfile,
  suggestions,
  userProfile,
  users,
  followingUsers,
})

export default reducers
